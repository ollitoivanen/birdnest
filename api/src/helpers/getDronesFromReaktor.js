const { XMLParser } = require("fast-xml-parser");
const xmlParser = new XMLParser();
const { REAKTOR_DRONES_URL, FETCH_OPTIONS_GET } = require("../utils/constants");
const fetchData = require("../utils/fetchData");

async function fetchDroneDataFromReaktor() {
  const response = await fetchData(REAKTOR_DRONES_URL, FETCH_OPTIONS_GET);
  const arrayData = xmlToArray(response.text());
  return arrayData;
}

async function xmlToArray(xmlData) {
  const jObjData = xmlParser.parse(xmlData);
  return jObjData.report.capture.drone;
}

module.exports = { fetchDroneDataFromReaktor, xmlToArray };
