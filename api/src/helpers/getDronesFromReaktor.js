const { XMLParser } = require("fast-xml-parser");
const xmlParser = new XMLParser();
const fetchData = require("./fetchData");
const { REAKTOR_DRONES_URL, FETCH_OPTIONS_GET } = require("../utils/constants");

async function fetchDroneDataFromReaktor() {
  const response = await fetchData(REAKTOR_DRONES_URL, FETCH_OPTIONS_GET);
  return response;
}

async function xmlToArray(response) {
  const xmlData = await response.text();
  const jObjData = xmlParser.parse(xmlData);
  return jObjData.report.capture.drone;
}

module.exports = { fetchDroneDataFromReaktor, xmlToArray };
