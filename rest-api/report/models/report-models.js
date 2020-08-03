const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reportSchema = new Schema(
  {
    reporters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    headline: {
      type: String,
      required: true,
    },
    report_finding: {
      assets: [
        {
          type: String,
        },
      ],
      note: {
          type: String
      },
      status: {
        type: String,
      },
      severity: {
        type: Number,
      },
    },
    updates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Update'
    }],
      tags: [{ 
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Tag'
        },
    ], 
  },

  { timestamps: true }
);




const Report = model("Report", reportSchema);

module.exports = { Report }