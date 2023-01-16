const mongoose = require("mongoose");
const { Schema } = mongoose;

const ViolatorSchema = new Schema({
  droneSerialNumber: { type: String, required: true },
  pilotId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdDt: { type: String, required: true },
  email: { type: String, required: true },
  closestDistance: { type: Number, required: true },
  latestsViolation: { type: Date, required: true },
});

module.exports = mongoose.model("Violator", ViolatorSchema);
