const { RADAR_ORIGIN } = require("../utils/constants");

function calculateViolatingDrones(drones) {
  let violatingDrones = [];
  let nonViolatingDrones = drones;
  drones.forEach((drone, index) => {
    const { positionX, positionY } = drone;
    const distance = calculateDistanceFromOrigin(positionX, positionY);
    if (distance < 100000) {
      drone.distance = distance;
      violatingDrones.push(drone);
      nonViolatingDrones.splice(index, 1);
    }
  });

  return [violatingDrones, nonViolatingDrones];
}

function calculateDistanceFromOrigin(positionX, positionY) {
  //Radar's origin isn't in (0,0) so we need to calculate the distance from (250 000, 250 000)
  const xDistanceFromOrigin = positionX - RADAR_ORIGIN.x;
  const yDistanceFromOrigin = positionY - RADAR_ORIGIN.y;
  //Pythagorean theorem (c^2=a^2+b^2)
  const sum =
    Math.pow(xDistanceFromOrigin, 2) + Math.pow(yDistanceFromOrigin, 2);

  const distance = Math.sqrt(sum);

  return Math.floor(distance);
}

module.exports = { calculateViolatingDrones, calculateDistanceFromOrigin };
