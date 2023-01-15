const { expect } = require("chai");
const { xmlToArray } = require("../helpers/getDronesFromReaktor");

const MOCK_DRONE_DATA = `<report>
    <deviceInformation deviceId="GUARDB1RD">
      <listenRange>500000</listenRange>
      <deviceStarted>2023-01-15T11:03:11.565Z</deviceStarted>
      <uptimeSeconds>12724</uptimeSeconds>
      <updateIntervalMs>2000</updateIntervalMs>
    </deviceInformation>
    <capture snapshotTimestamp="2023-01-15T14:35:16.245Z">
      <drone>
        <serialNumber>SN-JBDp7_KPYM</serialNumber>
        <model>Mosquito</model>
        <manufacturer>MegaBuzzer Corp</manufacturer>
        <mac>9c:72:fd:a6:fc:f5</mac>
        <ipv4>62.95.186.234</ipv4>
        <ipv6>1175:2fdc:f2b4:453b:1c92:4a6e:1a68:ad96</ipv6>
        <firmware>5.4.9</firmware>
        <positionY>1892.0667464366425</positionY>
        <positionX>484589.3045817293</positionX>
        <altitude>4644.105330318493</altitude>
      </drone>
      <drone>
        <serialNumber>SN-xO5VRi9eul</serialNumber>
        <model>HRP-DRP 1 Max</model>
        <manufacturer>ProDröne Ltd</manufacturer>
        <mac>65:09:65:43:09:31</mac>
        <ipv4>10.65.176.223</ipv4>
        <ipv6>a876:512f:98fa:35d2:56b5:293d:939b:7e2a</ipv6>
        <firmware>4.1.6</firmware>
        <positionY>42345.46083709778</positionY>
        <positionX>141607.6800039048</positionX>
        <altitude>4483.0352312168825</altitude>
      </drone>
      <drone>
        <serialNumber>SN-JqXU0wJLFX</serialNumber>
        <model>Altitude X</model>
        <manufacturer>DroneGoat Inc</manufacturer>
        <mac>f9:25:81:d3:e5:04</mac>
        <ipv4>29.202.163.184</ipv4>
        <ipv6>2737:645a:8f71:b9ff:157d:ce35:42d3:22eb</ipv6>
        <firmware>6.9.3</firmware>
        <positionY>86169.60288181597</positionY>
        <positionX>97742.23558426669</positionX>
        <altitude>4454.2165599046</altitude>
      </drone>
      <drone>
        <serialNumber>SN-tI1d7yyjql</serialNumber>
        <model>Falcon</model>
        <manufacturer>MegaBuzzer Corp</manufacturer>
        <mac>ef:10:ea:82:14:c6</mac>
        <ipv4>51.202.48.91</ipv4>
        <ipv6>b4d3:1225:c5a9:87e2:f7c6:f0c6:674a:4e7b</ipv6>
        <firmware>7.9.0</firmware>
        <positionY>155676.27206813323</positionY>
        <positionX>454588.53377522575</positionX>
        <altitude>4551.2207164200745</altitude>
      </drone>
    </capture>
  </report>`;

describe("Test getting drones from Reaktor", () => {
  it("Turn the xml into array.", async () => {
    const actualResult = await xmlToArray(MOCK_DRONE_DATA);
    expect(Array.isArray(actualResult)).to.equal(true);
  });
});
