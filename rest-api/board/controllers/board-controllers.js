const { Board } = require('../models/board-models');

async function createBoard(req, res) { 
    try{ 
        const board = await Board.create(req.body);
        res.status(201).json(board);
    } catch(error){
        res.status(500).json({
            message: 'something went wrong creating board, try again later!'
        }) 
    }
}


module.exports = { createBoard };