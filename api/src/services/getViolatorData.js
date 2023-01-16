//Service whose job is to fetch data from the Reaktor endpoint, find violating pilots and update database and local copy of violators.

const {
  calculateViolatingDrones,
} = require("../helpers/calculateViolatingDrones");
const { getDronesFromReaktor } = require("../helpers/getDronesFromReaktor");
const { getViolatingPilots } = require("../helpers/getViolatingPilots");

async function getViolatorData() {
  setInterval(async () => {
    const drones = await getDronesFromReaktor();
    const violatingDrones = calculateViolatingDrones(drones);
    const violatingPilots = await getViolatingPilots(violatingDrones);
  }, 2000);
}

module.exports = getViolatorData;
