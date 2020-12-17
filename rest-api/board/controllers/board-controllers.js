const { Board, Issue } = require("../models/board-models");
const { User } = require("../../user/models/user-models");
const ObjectId = require("mongoose").Types.ObjectId;
const {
  authorize,
} = require("../../authentication/middlewares/auth-middleware");
const {
  Unauthorized,
  BadRequest,
  notFound,
  serverError,
  created,
  success,
} = require("../../globals");

async function createBoard(req, res) {
  try {
    const defaultGroup = { title: 'New Group'};
    const defaultIssue = { 
         summary: 'issue summary',
        status: 'unresolved',
    };
    const userId = req.session.userId;
    const board = await Board.create(req.body);
    await board.groups.push(defaultGroup);
    await board.groups[0].issue.push(defaultIssue);
    const creator = await User.findById(userId);
    board.creator = creator._id;
    await board.save();
    // const position  = req.session.position;
    // authorize(req, position);
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({
        error,
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

async function getBoardsByCreator(req, res) {
    try {
      const userId = req.session.userId;
      const boards = await Board.find({
        creator: userId,
      })
      .sort({ createdAt: -1 })
      .populate({ 
          path: 'groups',
        //   populate: { 
        //       path: 'issues'
        //   }
      })
      ;
      res.status(200).json(boards);
    } catch (error) {
      res.status(500).json({
        message:
          "something went wrong getting boards created by this user, try again later",
      });
    }
  }


// async function getBoardByBoardId(req, res) {
//     const { boardId } = req.query;

//     try{
//         const board = await Board.findById(boardId);
//         if(!board){
//             notFound();
//         }
//         success(board);
//     }
//     catch(error){
//         serverError(error);
//     }
// }

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

async function linkReportToBoard(req, res) {
  try {
    const { id, report_id } = req.params;
    const targetBoard = await Board.findByIdAndUpdate(
      id,
      {
        $push: {
          reports: report_id,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json(targetBoard);
  } catch (error) {
    res.status(500).json({
      message: `something went wrong linking report to board, try again later!
            ${error.message}`,
    });
  }
}

async function getBoardReports(req, res) {
  try {
    const { id } = req.params;
    const board = await Board.findById(id).populate("reports");
    const reports = board.reports;
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: `something went wrong retrieving board reports, try again later!
            ${error.message}`,
    });
  }
}
async function addUser(req, res) {
  try {
    const { id, user_id } = req.params;
    const targetBoard = await Board.findByIdAndUpdate(
      id,
      {
        $push: {
          reports: user_id,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json(targetBoard);
  } catch (error) {
    res.status(500).json({
      message: `something went wrong adding user to board, try again later!
            ${error.message}`,
    });
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const board = await Board.findById(id).populate("user");
    const user = board.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: `something went wrong retrieving board user, try again later!
            ${error.message}`,
    });
  }
}



//groups
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

//issues
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

async function assignUserToIssue(req, res) {
  try {
    const { id, group_id, issue_id, user_id } = req.params;
    const targetBoard = await Board.findById(id);
    const targetGroup = await targetBoard.groups.id(group_id);
    const issue = await targetGroup.issue.id(issue_id);
    issue.assigned_user = user_id;
    await targetBoard.save();
    res.status(200).json(targetBoard);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong assigning issue to user, try again later!",
    });
  }
}

async function retrieveAssignedUser(req, res) {
  try {
    const { id, group_id, issue_id } = req.params;
    // const targetBoard = await Board.findById(id);
    // const targetGroup = await targetBoard.groups.id(group_id);
    // const issue = await targetGroup.issue.id(issue_id);
    // issue.populate('assigned_user')

    const targetBoard = await Board.findById(id).populate(
      `groups(${group_id}).issue(${issue_id}).assigned_user`
    );
    res.status(200).json(targetBoard.groups.issue);
  } catch (error) {
    res.status(500).json({
      message: `something went wrong retrieving assigned user, try again later!
            ${error.message}`,
    });
  }
}

// async function createBoardTag(req, res){

// }
// async function getBoardTags(req, res){

// }
// async function linkReportToIssue(req, res){

// }
// async function getLinkedReports(req, res){

// }
// async function unlinkReportToIssue(req, res){

// }
// async function addReporterToIssue(req, res){

// }
// async function getIssueReporters(req, res){

// }
// async function removeReporterIssue(req, res){

// }

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  //   getBoardByBoardId,
  getBoardsByCreator,
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
  assignUserToIssue,
  retrieveAssignedUser,
  linkReportToBoard,
  getBoardReports,
  addUser,
  getUser,
};
