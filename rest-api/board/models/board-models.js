const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const columnSchema = new Schema(
  {
    issue: {
      type: String,
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: true,
    },
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      default: true,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      default: true,
    },
    severity: {
      type: mongoose.Schema.ObjectId,
      ref: "Issue",
    },
    date: {
      type: Date,
    },
    duration: {
      type: String,
    },
    timeline: {
      type: String,
    },
    date_submission: {
      type: Date,
    },
    assigned_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: "admin",
    },
    estimated_cost: {
      type: Number,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    tag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

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
        },
      ],
      status: {
        type: String,
      },
      severity: {
        type: Number,
      },
    },
    updates: {
      type: String,
    },
  },
  { timestamps: true }
);

const issueSchema = new Schema(
  {
    summary: {
      type: String,
    },
    status: {
      type: String,
    },
    severity: {
      type: Number,
    },
    issue_aspect: {
      title: [
        {
          type: String,
        },
      ],
      label: {
        type: String,
      },
      description: {
        type: String,
      },
      report_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    },
  },
  { timestamps: true }
);

const tagSchema = new Schema(
  {
    name: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);


const groupSchema = new Schema({
    title: {
      type: String,
    },
    report : [reportSchema],
    columns : [columnSchema]
  //   column_id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Column",
  //   },
  },
  { timestamps: true });

const boardSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
  
      board_type: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
      groups: [groupSchema],
      // groups: [
      //   {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "Group",
      //   },
      // ],
      // report: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Report",
      // },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  );

const Board = model("Board", boardSchema);
const Group = model("Group", groupSchema);
const Column = model("Column", columnSchema);
const Report = model("Report", reportSchema);
const Issue = model("Issue", issueSchema);
const Tag = model("Tag", tagSchema);

module.exports = { Board, Group, Column, Report, Issue, Tag };
