//Service whose job is to fetch data from the Reaktor endpoint, find violating pilots and update database and local copy of violators.

const {
  calculateViolatingDrones,
} = require("../helpers/calculateViolatingDrones");
const { getDronesFromReaktor } = require("../helpers/getDronesFromReaktor");
const { getViolatingPilots } = require("../helpers/getViolatingPilots");
const getViolatorsFromDB = require("../helpers/getViolatorsFromDB");
const updateViolatorsToDB = require("../helpers/updateViolatorsToDB");

async function getViolatorData() {
  setInterval(async () => {
    const drones = await getDronesFromReaktor();
    const violatingDrones = calculateViolatingDrones(drones);
    const violatingPilots = await getViolatingPilots(violatingDrones);

    const violatorsFromDB = await getViolatorsFromDB();
    const updatedViolators = await updateViolatorsToDB(
      violatorsFromDB,
      violatingPilots
    );
    global.violatorData = updatedViolators;
    console.log(updatedViolators);

    //TODO update DB

    //TODO update global var
  }, 2000);
}

module.exports = getViolatorData;
