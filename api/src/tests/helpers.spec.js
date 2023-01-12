const { expect } = require("chai");
const fetchDroneDataFromReaktor = require("../helpers/fetchDroneDataFromReaktor");

describe("Test getDroneDataFromReaktor", () => {
  it("Return an ok response", async () => {
    const actualResult = await fetchDroneDataFromReaktor();
    console.log(actualResult);
    expect(actualResult.ok).to.equal(true);
  });
});
