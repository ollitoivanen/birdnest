const mongoose = require("mongoose");
const { Schema } = mongoose;

const ViolatorSchema = new Schema({
  pilotId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdDt: { type: Date, required: true },
  email: { type: String, required: true },
  droneSerialNumber: { type: String, required: true },
  closestDistance: { type: Number, required: true },
  latestViolation: { type: Date, required: true },
  lastSeenInTheArea: { type: Date, required: true },
});

module.exports = mongoose.model("Violator", ViolatorSchema);
