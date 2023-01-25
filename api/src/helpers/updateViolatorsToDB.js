const Violator = require("../models/violator");
const { getViolatingPilots } = require("./getViolatingPilots");

//Updates or creates violator to DB, returns an array of up-to date violators to be sent to client.
async function updateViolatorsToDB(
  violatorsFromDB,
  currentViolatingDrones,
  currentNonViolatingDrones
) {
  const upToDateViolators = [];

  for (let violatorFromDB of violatorsFromDB) {
    //Check if old violator is still violating through serialNumber-property
    const violatorStillInNDZIndex = currentViolatingDrones.findIndex(
      (currentDrone) => {
        return currentDrone.serialNumber === violatorFromDB.droneSerialNumber;
      }
    );

    const now = Date.now();
    if (violatorStillInNDZIndex != -1) {
      //Is still violating, update needed properties
      let { latestViolation, lastSeenInTheArea, closestDistance } =
        violatorFromDB;
      latestViolation = lastSeenInTheArea = now;

      const violatorStillInNDZ =
        currentViolatingDrones[violatorStillInNDZIndex];

      if (closestDistance < violatorStillInNDZ.closestDistance) {
        closestDistance = violatorStillInNDZ.closestDistance;
      }

      await violatorFromDB.save();
      upToDateViolators.push(violatorFromDB);
      currentViolatingDrones.splice(violatorStillInNDZIndex, 1);
      continue;
    }

    //Not violating anymore, but still seen by the equipment. App persists pilot data
    //For 10 minutes from being last seen, so this is neccessary.
    const violatorStillInRadarArea = currentNonViolatingDrones.find((drone) => {
      return drone.serialNumber === violatorFromDB.droneSerialNumber;
    });

    if (violatorStillInRadarArea) {
      violatorFromDB.lastSeenInTheArea = now;
      await violatorFromDB.save();
      upToDateViolators.push(violatorFromDB);
    } else {
      //Drone not seen anymore
      if (!expired(violatorFromDB)) {
        upToDateViolators.push(violatorFromDB);
        continue;
      }
      //Been over 10 minutes since last seen, delete.
      await Violator.deleteOne({ _id: violatorFromDB._id });
    }
  }

  //Only new violators left
  const violatingPilots = await getViolatingPilots(currentViolatingDrones);
  for (let violatingPilot of violatingPilots) {
    let newViolator = new Violator({ ...violatingPilot });
    await newViolator.save();
    upToDateViolators.push(newViolator);
  }

  return upToDateViolators;
}

function expired(pastViolator) {
  const expiry10Minutes = 10 * 60 * 1000;
  const { latestViolation } = pastViolator;
  const timeElapsed = Date.now() - latestViolation;
  return timeElapsed > expiry10Minutes;
}

module.exports = updateViolatorsToDB;
