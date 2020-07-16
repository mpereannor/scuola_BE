const router = require('express').Router();
const { createBoard, getBoards, getBoard, archiveBoard,  createGroupInBoard } = require('../controllers/board-controllers');

router.post('/', createBoard);
router.post('/:id/groups', createGroupInBoard)
router.get('/', getBoards);
router.get('/:id', getBoard);
router.delete('/:id', archiveBoard);


module.exports = router; 