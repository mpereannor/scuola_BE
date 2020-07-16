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
    res.status(201).json(boards);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong retrieving boards, try again later!",
    });
  }
}

async function getBoard(req, res) {
  try {
    const { id } = req.params;
    const board = await Board.findById(id);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong retrieving board, try again later!",
    });
  }
}

async function archiveBoard(req, res) {
  try {
    const { id } = req.params;
    const archivedBoard = await Board.findByIdAndDelete(id);
    res.status(201).json(archivedBoard);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong archiving board, try again later!",
    });
  }
}

async function createGroupInBoard(req, res) {
  try {
    const { id } = req.params;
    const { groups } = req.body;
    const group = groups[-1]
    const found = await Board.exists({ group });
    if (found) {
      throw new Error(
        "Group name already exists, Please choose different name"
      );
    }

    const createdGroup = await Board.create(
        id,
        group,
    );
    res.status(201).json(createdGroup);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong creating group, try again later!",
    });
  }
}

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  archiveBoard,
  createGroupInBoard,
};
