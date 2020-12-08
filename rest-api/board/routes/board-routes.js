const router = require("express").Router();

const {
  createBoard,
  getBoards,
  getBoard,
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
  getBoardByBoardId
} = require("../controllers/board-controllers");

const { 
    authUser,
    // authAdmin,
 } = require("../../authentication/middlewares/auth-middleware") 

//boards
router.post("/",
 authUser,
//  authAdmin, 
 createBoard
 );
router.get("/", authUser, getBoards);
router.get("/:id", getBoard);
router.get("/:id", getBoardByBoardId);
router.get("/:user_userId", getBoardsByCreator);
router.patch("/:id", updateBoard);
router.delete("/:id", archiveBoard);
router.patch('/:id/reports/:report_id', linkReportToBoard );
router.get('/:id/reports', getBoardReports);
router.patch('/:id/user/:user_id', addUser);
router.get('/:id/user', getUser)

//groups
router.post("/:id/groups", createGroupInBoard);
router.get("/:id/groups", getGroupsInBoard);
router.get("/:id/groups/:group_id", getGroupInBoard);
router.patch("/:id/groups/:group_id", updateGroupInBoard);
router.delete("/:id/groups/:group_id", archiveGroupInBoard);

//issue
router.post("/:id/groups/:group_id/issues", submitIssue);
router.get("/:id/groups/:group_id/issues", getIssuesInGroup);
router.get("/:id/groups/:group_id/issues/:issue_id", getIssueInGroup);
router.patch("/:id/groups/:group_id/issues/:issue_id", updateIssueInGroup);
router.delete("/:id/groups/:group_id/issues/:issue_id", closeIssueInGroup);

router.patch('/:id/groups/:group_id/issues/:issue_id/users/:user_id', assignUserToIssue);
router.get('/:id/groups/:group_id/issues/:issue_id/users', retrieveAssignedUser)

module.exports = router;
