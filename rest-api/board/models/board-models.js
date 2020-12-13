const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
    },
    estimated_cost: {
      type: Number,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],

    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
    reporters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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

const groupSchema = new Schema(
  {
    title: {
      type: String,
    },
    issue: [issueSchema],
  },
  { timestamps: true }
);

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
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
  },
  { timestamps: true }
);

const Board = model("Board", boardSchema);
const Group = model("Group", groupSchema);
const Issue = model("Issue", issueSchema);
const Tag = model("Tag", tagSchema);

module.exports = { Board, Group, Issue, Tag };
