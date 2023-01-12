const { XMLParser } = require("fast-xml-parser");
const xmlParser = new XMLParser();

async function xmlToArray(response) {
  const xmlData = await response.text();
  const jObjData = xmlParser.parse(xmlData);
  return jObjData.report.capture.drone;
}

module.exports = xmlToArray;
