const router = require('express').Router();

const { createBoard, getBoards, getBoard, updateBoard, archiveBoard,  createGroupInBoard, getGroupsInBoard, getGroupInBoard, updateGroupInBoard, archiveGroupInBoard } = require('../controllers/board-controllers');

//boards
router.post('/', createBoard);
router.get('/', getBoards);
router.get('/:id', getBoard);
router.patch('/:id', updateBoard)
router.delete('/:id', archiveBoard);

//groups
router.post('/:id/groups', createGroupInBoard);
router.get('/:id/groups', getGroupsInBoard);
router.get('/:id/groups/:group_id', getGroupInBoard);
router.patch('/:id/groups/:group_id', updateGroupInBoard);
router.delete('/:id/groups/:group_id', archiveGroupInBoard)
// router.get('/:id')


module.exports = router; 