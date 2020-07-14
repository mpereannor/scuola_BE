const router = require('express').Router();
const { createBoard } = require('../controllers/board-controllers');

router.post('/', createBoard);

module.exports = router; 