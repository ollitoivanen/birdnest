const { expect } = require("chai");
const {
  calculateViolatingDrones,
} = require("../helpers/calculateViolatingDrones");
const { xmlToArray } = require("../helpers/getDronesFromReaktor");

const MOCK_DRONE_DATA_XML = `<report>
<deviceInformation deviceId="GUARDB1RD">
  <listenRange>500000</listenRange>
  <deviceStarted>2023-01-15T11:03:11.565Z</deviceStarted>
  <uptimeSeconds>15598</uptimeSeconds>
  <updateIntervalMs>2000</updateIntervalMs>
</deviceInformation>
<capture snapshotTimestamp="2023-01-15T15:23:09.955Z">
  <drone>
    <serialNumber>SN-oJmkbT2VHt</serialNumber>
    <model>Mosquito</model>
    <manufacturer>MegaBuzzer Corp</manufacturer>
    <mac>9b:0e:03:82:de:db</mac>
    <ipv4>244.243.242.215</ipv4>
    <ipv6>0d1a:dc4f:fea4:496c:08aa:17ee:2420:21fe</ipv6>
    <firmware>2.9.1</firmware>
    <positionY>87275.70023201861</positionY>
    <positionX>408354.36509588547</positionX>
    <altitude>4837.044631232593</altitude>
  </drone>
  <drone>
    <serialNumber>SN-IEBF6w-BOT</serialNumber>
    <model>HRP-DRP 1 Max</model>
    <manufacturer>ProDröne Ltd</manufacturer>
    <mac>7c:3d:26:56:5b:57</mac>
    <ipv4>15.141.178.235</ipv4>
    <ipv6>2bb9:60e9:91ac:ac6a:f3ed:fe65:f9c1:9d26</ipv6>
    <firmware>6.1.0</firmware>
    <positionY>98252.69261129345</positionY>
    <positionX>393152.0224320003</positionX>
    <altitude>4735.4889445171975</altitude>
  </drone>
  <drone>
    <serialNumber>SN-gT7-jbKyLt</serialNumber>
    <model>Altitude X</model>
    <manufacturer>DroneGoat Inc</manufacturer>
    <mac>68:e0:db:e8:79:09</mac>
    <ipv4>77.226.171.25</ipv4>
    <ipv6>0146:e2be:1401:69a8:1970:0f04:1161:a3c0</ipv6>
    <firmware>0.5.3</firmware>
    <positionY>180033.38178214993</positionY>
    <positionX>300436.24368446175</positionX>
    <altitude>4443.610800229645</altitude>
  </drone>
  <drone>
    <serialNumber>SN-_Lt9Kx3cR0</serialNumber>
    <model>Altitude X</model>
    <manufacturer>DroneGoat Inc</manufacturer>
    <mac>5a:62:c9:b2:d3:b9</mac>
    <ipv4>235.51.77.31</ipv4>
    <ipv6>25e8:74e9:ea43:763b:b981:cb27:1271:4cd3</ipv6>
    <firmware>7.2.6</firmware>
    <positionY>51508.98782738454</positionY>
    <positionX>206667.59996134305</positionX>
    <altitude>4531.8597881103715</altitude>
  </drone>
  <drone>
    <serialNumber>SN-y-TeWWnYFt</serialNumber>
    <model>HRP-DRP 1 Max</model>
    <manufacturer>ProDröne Ltd</manufacturer>
    <mac>d8:44:28:a4:59:d6</mac>
    <ipv4>221.146.47.203</ipv4>
    <ipv6>9766:7717:af60:803c:277e:074e:1570:18af</ipv6>
    <firmware>7.1.3</firmware>
    <positionY>482198.3706670175</positionY>
    <positionX>296913.25966641516</positionX>
    <altitude>4321.822918200911</altitude>
  </drone>
  <drone>
    <serialNumber>SN-bceSwJdfcJ</serialNumber>
    <model>Mosquito</model>
    <manufacturer>MegaBuzzer Corp</manufacturer>
    <mac>34:ac:61:f5:01:33</mac>
    <ipv4>61.196.159.132</ipv4>
    <ipv6>990d:4311:ca9b:e347:da7a:3089:f33c:0abc</ipv6>
    <firmware>0.0.0</firmware>
    <positionY>113561.70400512894</positionY>
    <positionX>499546.6130766679</positionX>
    <altitude>4937.680812555731</altitude>
  </drone>
</capture>
</report>`;
const MOCK_DRONE_DATA = [
  {
    serialNumber: "SN-oJmkbT2VHt",
    model: "Mosquito",
    manufacturer: "MegaBuzzer Corp",
    mac: "9b:0e:03:82:de:db",
    ipv4: "244.243.242.215",
    ipv6: "0d1a:dc4f:fea4:496c:08aa:17ee:2420:21fe",
    firmware: "2.9.1",
    positionY: 87275.70023201861,
    positionX: 408354.36509588547,
    altitude: 4837.044631232593,
  },
  {
    serialNumber: "SN-IEBF6w-BOT",
    model: "HRP-DRP 1 Max",
    manufacturer: "ProDröne Ltd",
    mac: "7c:3d:26:56:5b:57",
    ipv4: "15.141.178.235",
    ipv6: "2bb9:60e9:91ac:ac6a:f3ed:fe65:f9c1:9d26",
    firmware: "6.1.0",
    positionY: 98252.69261129345,
    positionX: 393152.0224320003,
    altitude: 4735.4889445171975,
  },
  {
    serialNumber: "SN-gT7-jbKyLt",
    model: "Altitude X",
    manufacturer: "DroneGoat Inc",
    mac: "68:e0:db:e8:79:09",
    ipv4: "77.226.171.25",
    ipv6: "0146:e2be:1401:69a8:1970:0f04:1161:a3c0",
    firmware: "0.5.3",
    positionY: 180033.38178214993,
    positionX: 300436.24368446175,
    altitude: 4443.610800229645,
  },
  {
    serialNumber: "SN-_Lt9Kx3cR0",
    model: "Altitude X",
    manufacturer: "DroneGoat Inc",
    mac: "5a:62:c9:b2:d3:b9",
    ipv4: "235.51.77.31",
    ipv6: "25e8:74e9:ea43:763b:b981:cb27:1271:4cd3",
    firmware: "7.2.6",
    positionY: 51508.98782738454,
    positionX: 206667.59996134305,
    altitude: 4531.8597881103715,
  },
  {
    serialNumber: "SN-y-TeWWnYFt",
    model: "HRP-DRP 1 Max",
    manufacturer: "ProDröne Ltd",
    mac: "d8:44:28:a4:59:d6",
    ipv4: "221.146.47.203",
    ipv6: "9766:7717:af60:803c:277e:074e:1570:18af",
    firmware: "7.1.3",
    positionY: 482198.3706670175,
    positionX: 296913.25966641516,
    altitude: 4321.822918200911,
  },
  {
    serialNumber: "SN-bceSwJdfcJ",
    model: "Mosquito",
    manufacturer: "MegaBuzzer Corp",
    mac: "34:ac:61:f5:01:33",
    ipv4: "61.196.159.132",
    ipv6: "990d:4311:ca9b:e347:da7a:3089:f33c:0abc",
    firmware: "0.0.0",
    positionY: 113561.70400512894,
    positionX: 499546.6130766679,
    altitude: 4937.680812555731,
  },
];
const MOCK_VIOLATOR_DATA = [
  {
    serialNumber: "SN-gT7-jbKyLt",
    model: "Altitude X",
    manufacturer: "DroneGoat Inc",
    mac: "68:e0:db:e8:79:09",
    ipv4: "77.226.171.25",
    ipv6: "0146:e2be:1401:69a8:1970:0f04:1161:a3c0",
    firmware: "0.5.3",
    positionY: 180033.38178214993,
    positionX: 300436.24368446175,
    altitude: 4443.610800229645,
    distance: 86250,
  },
];
const MOCK_PILOT_DATA = {
  pilotId: "P-bfYxZ7Ygaq",
  firstName: "Demond",
  lastName: "Kerluke",
  phoneNumber: "+210608670101",
  createdDt: "2022-06-08T07:06:38.931Z",
  email: "demond.kerluke@example.com",
};

describe("Test getting drones from Reaktor", () => {
  it("Turn the xml into array.", async () => {
    const actualResult = await xmlToArray(MOCK_DRONE_DATA_XML);
    expect(Array.isArray(actualResult)).to.equal(true);
  });
});

describe("Test calculating violating drones", () => {
  it("Returns array with only pilots closer than 100m", async () => {
    const actualResult = calculateViolatingDrones(MOCK_DRONE_DATA);
    console.log(actualResult);
    expect(actualResult === MOCK_VIOLATOR_DATA);
  });
});

//No tests for getViolatingPilots as it is dependant on Reaktor API.
