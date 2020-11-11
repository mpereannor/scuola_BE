const router = require("express").Router();

const {
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
  assignUserToIssue,
  retrieveAssignedUser,
  linkReportToBoard,
  getBoardReports,
  addUser, 
  getUser
} = require("../controllers/board-controllers");

const { 
    authUser,
    authorize,
    // authPosition,
    // position
 } = require("../../authentication/middlewares/auth-middleware") 


 const userPosition = { 
    ADMIN: 'admin',
    TUTOR: 'tutor',
    STUDENT: 'student',
    GUEST: 'guest'
}
//boards
router.post("/",
 authUser,
 authorize(userPosition.ADMIN), 
//  authPosition('admin'),
 createBoard
 );
router.get("/", authUser, getBoards);
router.get("/:id", getBoard);
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
