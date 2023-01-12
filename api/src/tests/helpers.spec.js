const { expect } = require("chai");
const fetchDroneDataFromReaktor = require("../helpers/fetchDroneDataFromReaktor");
const xmlToArray = require("../helpers/xmlToArray");
describe("Test helpers", () => {
  describe("Test getDroneDataFromReaktor", () => {
    it("Return an ok response", async () => {
      const fetchDroneDataResult = await fetchDroneDataFromReaktor();
      expect(fetchDroneDataResult.ok).to.equal(true);
    });
  });

  describe("Test xmlToArray", () => {
    it("Return array", async () => {
      const fetchDroneDataResult = await fetchDroneDataFromReaktor();
      const actualResult = await xmlToArray(fetchDroneDataResult);

      expect(Array.isArray(actualResult)).to.equal(true);
    });
  });
});
