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
  closeIssueInGroup
} = require("../controllers/board-controllers");

//boards
router.post("/", createBoard);
router.get("/", getBoards);
router.get("/:id", getBoard);
router.patch("/:id", updateBoard);
router.delete("/:id", archiveBoard);

//groups
router.post("/:id/groups", createGroupInBoard);
router.get("/:id/groups", getGroupsInBoard);
router.get("/:id/groups/:group_id", getGroupInBoard);
router.patch("/:id/groups/:group_id", updateGroupInBoard);
router.delete("/:id/groups/:group_id", archiveGroupInBoard);


//issue
router.post('/:id/groups/:group_id/issues', submitIssue);
router.get('/:id/groups/:group_id/issues', getIssuesInGroup);
router.get('/:id/groups/:group_id/issues/:issue_id', getIssueInGroup);
router.patch('/:id/groups/:group_id/issues/:issue_id', updateIssueInGroup);
router.delete('/:id/groups/:group_id/issues/:issue_id', closeIssueInGroup);


// //report
// router.post("/:id/groups/:group_id/report", createReport);
// router.get('/:id/groups/:group_id/report', getReport);
// router.update('/:id/groups/:group_id/report', updateReport);
// router.delete('/:id/groups/:group_id/report', closeReport);

module.exports = router;
