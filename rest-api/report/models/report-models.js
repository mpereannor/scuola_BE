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
      asset: [
        {
          type: String,
          //sourceDocuments
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
  },
  { timestamps: true }
);


const updateSchema = new Schema({ 
    update:{ 
        type: String
    },
    upvote: { 
        type: Number,
        default: 0
    },
    downvote: { 
        type: Number,
        default: 0
    }
},
{ timestamps: true})

const Report = model("Report", reportSchema);
const Update = model('Update',  updateSchema);

module.exports = { Report, Update }