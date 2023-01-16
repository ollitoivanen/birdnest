const Violator = require("../models/violator");

//Updates or creates violator to DB, returns an array of up-to date violators to be sent to client.
async function updateViolatorsToDB(pastViolators, currentViolators) {
  let upToDateViolators = [];

  for (let pastViolator of pastViolators) {
    console.log("Still going");
    //Check if past violator is currently violating.
    const pastViolatorStillViolatingIndex = stillViolates(
      pastViolator,
      currentViolators
    );

    if (pastViolatorStillViolatingIndex != -1) {
      console.log("match");

      //Currently violating, get data, update distance if needed. Update latest violating. Save.
      const pastViolatorStillViolating =
        currentViolators[pastViolatorStillViolatingIndex];
      updateDistanceAndDate(pastViolator, pastViolatorStillViolating);

      await pastViolator.save().then((doc) => {
        console.log("saved");
      });
      upToDateViolators.push(pastViolator);
      //Remove from currentViolators so we can loop through them faster in the next interation.
      currentViolators.splice(pastViolatorStillViolatingIndex, 1);
    } else {
      console.log("not match");
      //Not currently violating, check if 10 minutes since last violation.
      if (!expired(pastViolator)) {
        upToDateViolators.push(pastViolator);
        continue;
      }

      await Violator.deleteOne({ _id: pastViolator._id });
    }
  }
  console.log("time for current violators: " + currentViolators);

  for (let currentViolator of currentViolators) {
    console.log("already here");
    let newViolator = new Violator({ ...currentViolator });
    await newViolator.save();
    upToDateViolators.push(newViolator);
    console.log("Pushing from current " + upToDateViolators);
    //TODO add validating
  }
  return upToDateViolators;

  //At this point only items left in currentViolators are new violators.
}

async function loopOldViolators(pastViolators, currentViolators) {
  const upToDateViolators = [];
}

function stillViolates(pastViolator, currentViolators) {
  return currentViolators.findIndex((currentViolator) => {
    console.log("looping " + currentViolator.droneSerialNumber);
    console.log("looping2 " + pastViolator.droneSerialNumber);

    return currentViolator.droneSerialNumber === pastViolator.droneSerialNumber;
  });
}

function expired(pastViolator) {
  const expiry10Minutes = 10 * 60 * 1000;
  const { latestViolation } = pastViolator;
  const timeElapsed = Date.now() - latestViolation;

  return timeElapsed > expiry10Minutes;
}

function updateDistanceAndDate(pastViolator, currentViolator) {
  const currentClosest = currentViolator.closestDistance;
  const pastClosest = pastViolator.closestDistance;
  if (currentClosest < pastClosest) {
    pastViolator.closestDistance = currentClosest;
  }
  pastViolator.latestViolation = currentViolator.latestViolation;

  return pastViolator;
}

module.exports = updateViolatorsToDB;
