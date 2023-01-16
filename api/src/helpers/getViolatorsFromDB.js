const Violator = require("../models/violator");

async function getViolatorsFromDB() {
  //Gets all documents in the Violators-collection in MongoDB
  const violatorsInDB = await Violator.find();
  return violatorsInDB;
}

module.exports = getViolatorsFromDB;
