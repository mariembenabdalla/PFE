const mongoose = require("mongoose");

const handMadeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  jobName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
  },

  project: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: { type: String },
      description: { type: String },
      file: [
        {
          type: String,
        },
      ],
    },
  ],
});
module.exports = mongoose.model("handMadeDetails", handMadeSchema);
