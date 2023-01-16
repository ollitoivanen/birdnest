function updateViolators(pastViolators, currentViolators) {
  let upToDateViolators = [];
  pastViolators.array.forEach((pastViolator) => {
    //Check if past violator is currently violating.
    const pastViolatorStillViolatingIndex = stillViolates(
      pastViolator,
      currentViolators
    );
    if (pastViolatorStillViolatingIndex != -1) {
      //Currently violating, get data, update distance if needed.
      const pastViolatorStillViolating =
        currentViolators[pastViolatorStillViolatingIndex];
      checkDistance(pastViolator, pastViolatorStillViolating);
      upToDateViolators.push(pastViolatorStillViolating);
      //Remove from currentViolators so we can loop through them faster in the next interation.
      currentViolators.splice(pastViolatorStillViolatingIndex, 1);
    } else {
      //Not currently violating, check if 10 minutes since last violation.
      if (expired(pastViolator)) return;
      upToDateViolators.push(pastViolator);
    }
  });
  //At this point only items left in currentViolators are new violators.
  upToDateViolators.push(...currentViolators);
  return upToDateViolators;
}

const stillViolates = (pastViolator, currentViolators) => {
  return currentViolators.findIndex((currentViolator) => {
    currentViolator.droneSerialNumber = pastViolator.droneSerialNumber;
  });
};

function checkDistance(pastViolator, currentViolator) {
  const currentClosest = currentViolator.closestDistance;
  const pastClosest = pastViolator.closestDistance;
  if (currentClosest > pastClosest) {
    currentViolator.closestDistance = pastClosest;
  }
  return currentViolator;
}

function expired(pastViolator) {
  const expiry10Minutes = 10 * 60 * 10000;
  const { latestViolation } = pastViolator;
  const timeElapsed = Date.now() - latestViolation;

  return timeElapsed > expiry10Minutes;
}
