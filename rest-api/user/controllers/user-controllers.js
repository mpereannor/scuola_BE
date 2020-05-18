const models = require("../models/user-models");

async function createUser(req, res) {
  try {
    const user = await models.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong creating user, try again later!",
      error: error.message,
    });
  }
}

async function getUsers(req, res) { 
    try{ 
        const user = await models.find({});
        if(user.length){
            res.status(201).json(user);
        } else{ 
            res.status(404).json({message: 'no user'})
        }
    } catch(error) { 
        res.status(500).json({ 
            message: "something went wrong getting users, try again later!",
            error: error.message
        })
    }

}

async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await models.findById(id);
        res.status(201).json(user);
    } catch(error){ 
        res.status(500).json({ 
            message: "something went wrong getting user, try again later!",
            error: error.message
        })
    }
}

async function updateUser(req, res) { 
    try {
        const { id } = req.params;
        const updatedUser = await models.findByIdAndUpdate(id, req.body)
        res.status(201).json(updatedUser)
    } catch(error){ 
        res.status(500).json({ 
            message: "something went wrong updating user, try again later!",
            error: error.message
        })
    }
}

async function deleteUser(req, res) { 
    try{ 
        const { id } = req.params;
        const deletedUser = await models.findByIdAndDelete(id);
        res.status(201).json(deletedUser);
    }  catch(error){ 
        res.status(500).json({ 
            message: "something went wrong deleting user, try again later!", 
            error: error.message
        })
    }
}
module.exports = { createUser, getUsers, getUser, updateUser, deleteUser};
