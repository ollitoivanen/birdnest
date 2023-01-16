const { XMLParser } = require("fast-xml-parser");
const xmlParser = new XMLParser();
const { REAKTOR_DRONES_URL, FETCH_OPTIONS_GET } = require("../utils/constants");
const fetchData = require("../utils/fetchData");

async function getDronesFromReaktor() {
  const response = await fetchData(REAKTOR_DRONES_URL, FETCH_OPTIONS_GET);
  const body = await response.text();
  const arrayData = await xmlToArray(body);
  return arrayData;
}

async function xmlToArray(xmlData) {
  const jObjData = await xmlParser.parse(xmlData);
  return jObjData.report.capture.drone;
}

module.exports = { getDronesFromReaktor, xmlToArray };
