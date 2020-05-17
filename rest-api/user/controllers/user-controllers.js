const userModel = require('../models/user-models')

async function createUser (req, res) {
    try{ 
        const user = await userModel.insertOne(req.body)
        res.status(201).json(user) 
    } catch (err){
        res.status(500).json({
            message: 'Something went wrong, try again', 
            err
        })
    }
}

module.exports = { createUser }