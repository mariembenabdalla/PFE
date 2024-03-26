const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  nameJob: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("job", jobSchema);
