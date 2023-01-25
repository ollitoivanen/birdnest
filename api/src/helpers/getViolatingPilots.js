const Violator = require("../models/violator");
const { REAKTOR_PILOTS_URL, FETCH_OPTIONS_GET } = require("../utils/constants");
const fetchData = require("../utils/fetchData");
const { pilot404 } = require("../utils/pilot404");

async function getViolatingPilots(violatingDrones) {
  const violatingPilots = await Promise.all(
    violatingDrones.map(async (drone) => {
      const { serialNumber, distance } = drone;
      const pilotData = await fetchPilotDataFromReaktor(serialNumber);
      pilotData ??= pilot404;
      const now = Date.now();
      //Adding needed fields to pilot data
      const fullPilotData = {
        ...pilotData,
        droneSerialNumber: serialNumber,
        closestDistance: distance,
        latestViolation: now,
        lastSeenInTheArea: now,
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
