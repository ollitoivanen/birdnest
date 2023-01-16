const Violator = require("../models/violator");
const { REAKTOR_PILOTS_URL, FETCH_OPTIONS_GET } = require("../utils/constants");
const fetchData = require("../utils/fetchData");

async function getViolatingPilots(violatingDrones) {
  const violatingPilots = await Promise.all(
    violatingDrones.map(async (drone) => {
      const { serialNumber, distance } = drone;
      const pilotData = await fetchPilotDataFromReaktor(serialNumber);
      //Adding needed fields to pilot data
      const fullPilotData = {
        ...pilotData,
        droneSerialNumber: serialNumber,
        closestDistance: distance,
        latestViolation: Date.now(),
      };
      return fullPilotData;
    })
  );
  return violatingPilots;
}

async function fetchPilotDataFromReaktor(serialNumber) {
  //TODO handle 404 case
  const url = REAKTOR_PILOTS_URL + serialNumber;
  const response = await fetchData(url, FETCH_OPTIONS_GET);
  const pilotData = await response.json();
  return pilotData;
}

module.exports = { getViolatingPilots };
