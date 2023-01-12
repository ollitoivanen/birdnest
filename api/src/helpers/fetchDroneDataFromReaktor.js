const fetchData = require("./fetchData");
const { REAKTOR_DRONES_URL, FETCH_OPTIONS_GET } = require("../utils/constants");

async function fetchDroneDataFromReaktor() {
  const response = await fetchData(REAKTOR_DRONES_URL, FETCH_OPTIONS_GET);
  return response;
}

module.exports = fetchDroneDataFromReaktor;
