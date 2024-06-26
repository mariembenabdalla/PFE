const mongoose = require("mongoose");

const offreSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  handMade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  time: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Refused", "Accepted"],
  },
});

module.exports = mongoose.model("offer", offreSchema);
