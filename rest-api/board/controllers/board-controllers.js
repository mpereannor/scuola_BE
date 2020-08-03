const { Board } = require("../models/board-models");
const { BadRequest } = require("../../authentication/middlewares/auth-errors");

async function createBoard(req, res) {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong creating board, try again later!",
    });
  }
}

async function getBoards(req, res) {
  try {
    const boards = await Board.find({});
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong retrieving boards, try again later!",
    });
  }
}

async function getBoard(req, res) {
  const { id } = req.params;
  try {
    const board = await Board.findById(id);
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong retrieving board, try again later!",
    });
  }
}

async function updateBoard(req, res) {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedBoard = await Board.findByIdAndUpdate(id, update);
    res.status(201).json(updatedBoard);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong updating board, try again later!",
    });
  }
}

async function archiveBoard(req, res) {
  try {
    const { id } = req.params;
    const archivedBoard = await Board.findByIdAndDelete(id);
    res.status(200).json(archivedBoard);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong archiving board, try again later!",
    });
  }
}

async function createGroupInBoard(req, res) {
  try {
    const targetBoard = await Board.findById(req.params.id);
    targetBoard.groups.push({
      title: req.body.title,
    });
    const createdGroup = await targetBoard.save();
    res.status(201).json(createdGroup);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong creating group in board, try again later!",
    });
  }
}

async function getGroupsInBoard(req, res) {
  const { id } = req.params;
  try {
    const targetBoard = await Board.findById(id);
    const groups = await targetBoard.groups;
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong retrieving groups from board, try again later!",
    });
  }
}

async function getGroupInBoard(req, res) {
  const { id, group_id } = req.params;

  try {
    const targetBoard = await Board.findById(id);
    const group = await targetBoard.groups.id(group_id);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong retrieving group from board, try again later!",
    });
  }
}

async function updateGroupInBoard(req, res) {
  const { id, group_id } = req.params;
  const update = req.body;
  try {
    const targetBoard = await Board.findById(id);
    const targetGroup = await targetBoard.groups.id(group_id);
    targetGroup.set(update);
    const updatedGroup = await targetBoard.save();
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong updating group in board, try again later!",
    });
  }
}

async function archiveGroupInBoard(req, res) {
  const { id, group_id } = req.params;
  try {
    const targetBoard = await Board.findById(id);
    const archivedGroup = await targetBoard.groups.id(group_id).remove();
    const updatedGroup = await targetBoard.save();
    res.status(200).json(archivedGroup);
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong archiving group in board, try again later!",
    });
  }
}

async function submitIssue(req, res) {
  const { id, group_id } = req.params;
  const issueData = req.body;
  try {
    const targetBoard = await Board.findById(id);
    const targetGroup = await targetBoard.groups.id(group_id);
    const submittedIssue = await targetGroup.issue.push(issueData);

    const savedIssue = await targetBoard.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong submitting issue, try again later!",
    });
  }
}

async function getIssuesInGroup(req, res) {
  const { id, group_id } = req.params;
  try {
    const targetBoard = await Board.findById(id);
    const targetGroup = await targetBoard.groups.id(group_id);
    const issues = await targetGroup.issue;
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong retrieving issues from group, try again later!",
    });
  }
}

async function getIssueInGroup(req, res) {
  const { id, group_id, issue_id } = req.params;
  try {
    const targetBoard = await Board.findById(id);
    const targetGroup = await targetBoard.groups.id(group_id);
    const issue = await targetGroup.issue.id(issue_id);
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong retrieving issue from group, try again later!",
    });
  }
}

async function updateIssueInGroup(req, res) {
  const { id, group_id, issue_id } = req.params;
  const update = req.body;
  try {
    const targetBoard = await Board.findById(id);
    const targetGroup = await targetBoard.groups.id(group_id);
    const targetIssue = await targetGroup.issue.id(issue_id);
    targetIssue.set(update);
    const updatedIssue = await targetBoard.save();
    res.status(201).json(updatedIssue);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong updating issue, try again later!",
    });
  }
}

async function closeIssueInGroup(req, res) {
  const { id, group_id, issue_id } = req.params;
  try {
    const targetBoard = await Board.findById(id);
    const targetGroup = await targetBoard.groups.id(group_id);
    const archivedIssue = await targetGroup.issue.id(issue_id).remove();
    const updatedIssue = await targetBoard.save();
    res.status(200).json(archivedIssue);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong closing issue, try again later!",
    });
  }
}
module.exports = {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  archiveBoard,
  createGroupInBoard,
  getGroupsInBoard,
  getGroupInBoard,
  updateGroupInBoard,
  archiveGroupInBoard,
  submitIssue,
  getIssuesInGroup,
  getIssueInGroup,
  updateIssueInGroup,
  closeIssueInGroup,
};
