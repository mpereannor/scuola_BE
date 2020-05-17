const models = require('../models/user-models')

async function register (req, res) {
    try { 
        const user = await models.User.insertOne(req.body);
        res.status(201).json(user)
    }
    catch(error) { 
        res.status(500).json({ 
            message: 'something went wrong, try again later!', error
        })
    }

} 

module.exports = { register }