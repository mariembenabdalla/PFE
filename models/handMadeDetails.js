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
      name: { type: String },
      description: { type: String },
      images: [
        {
          type: String,
        },
      ],
      videos: [{ type: String }],
    },
  ],
});

module.exports = mongoose.model("handMadeDetails", handMadeSchema);
