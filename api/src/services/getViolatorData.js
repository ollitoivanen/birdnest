//Service whose job is to fetch data from the Reaktor endpoint, find violating pilots and update database and local copy of violators.

const {
  calculateViolatingDrones,
} = require("../helpers/calculateViolatingDrones");
const { getDronesFromReaktor } = require("../helpers/getDronesFromReaktor");
const getViolatorsFromDB = require("../helpers/getViolatorsFromDB");
const updateViolatorsToDB = require("../helpers/updateViolatorsToDB");

const Violator = require("../models/violator");

async function getViolatorData() {
  setInterval(async () => {
    const drones = await getDronesFromReaktor();
    const [currentViolatingDrones, currentNonViolatingDrones] =
      calculateViolatingDrones(drones);

    const violatorsFromDB = await getViolatorsFromDB();

    const upToDateViolators = await updateViolatorsToDB(
      violatorsFromDB,
      currentViolatingDrones,
      currentNonViolatingDrones
    );
    global.violatorData = upToDateViolators;
  }, 2000);
}

function expired(pastViolator) {
  const expiry10Minutes = 10 * 60 * 1000;
  const { latestViolation } = pastViolator;
  const timeElapsed = Date.now() - latestViolation;

  return timeElapsed > expiry10Minutes;
}
module.exports = getViolatorData;
