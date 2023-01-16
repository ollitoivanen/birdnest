const Violator = require("../models/violator");

//Updates or creates violator to DB, returns an array of up to date violators to be sent to client.
async function updateViolatorsToDB(pastViolators, currentViolators) {
  console.log("past " + pastViolators);
  let upToDateViolators = [];
  pastViolators.forEach(async (pastViolator) => {
    //Check if past violator is currently violating.
    const pastViolatorStillViolatingIndex = stillViolates(
      pastViolator,
      currentViolators
    );
    if (pastViolatorStillViolatingIndex != -1) {
      //Currently violating, get data, update distance if needed. Update latest violating. Save.
      const pastViolatorStillViolating =
        currentViolators[pastViolatorStillViolatingIndex];
      updateDistanceAndDate(pastViolator, pastViolatorStillViolating);
      await pastViolator.save();
      upToDateViolators.push(pastViolator);
      //Remove from currentViolators so we can loop through them faster in the next interation.
      currentViolators.splice(pastViolatorStillViolatingIndex, 1);
    } else {
      //Not currently violating, check if 10 minutes since last violation.
      if (!expired(pastViolator)) {
        upToDateViolators.push(pastViolator);
        return;
      }
      await Violator.deleteOne({ _id: pastViolator._id });
    }
  });
  //At this point only items left in currentViolators are new violators.
  currentViolators.forEach(async (currentViolator) => {
    let newViolator = new Violator({ ...currentViolator });
    await newViolator.save();
    upToDateViolators.push(newViolator);
    //TODO add validating
  });
  return upToDateViolators;
}

const stillViolates = (pastViolator, currentViolators) => {
  return currentViolators.findIndex((currentViolator) => {
    currentViolator.droneSerialNumber = pastViolator.droneSerialNumber;
  });
};

function updateDistanceAndDate(pastViolator, currentViolator) {
  const currentClosest = currentViolator.closestDistance;
  const pastClosest = pastViolator.closestDistance;
  if (currentClosest < pastClosest) {
    pastViolator.closestDistance = currentClosest;
    pastViolator.latestViolation = currentViolator.latestViolation;
  }
  return pastViolator;
}

function expired(pastViolator) {
  const expiry10Minutes = 10 * 60 * 10000;
  const { latestViolation } = pastViolator;
  const timeElapsed = Date.now() - latestViolation;

  return timeElapsed > expiry10Minutes;
}

module.exports = updateViolatorsToDB;
