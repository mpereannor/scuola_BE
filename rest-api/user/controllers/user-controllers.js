const { User, Profile } = require("../models/user-models");

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong creating user, try again later!",
      error: error.message,
    });
  }
}

function getUsers(req, res) {
  User.find({})
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong getting users, try again later!",
        error: error.message,
      });
    });
}

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong getting user, try again later!",
      error: error.message,
    });
  }
}

async function replaceUser(req, res) {
  try {
    const { id } = req.params;
    const replacedUser = await User.findByIdAndUpdate(id, req.body);
    res.status(201).json(replacedUser);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong updating user, try again later!",
      error: error.message,
    });
  }
}
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong updating user, try again later!",
      error: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong deleting user, try again later!",
      error: error.message
    });
  }
}

async function createUserProfile(req, res) { 
    try {
        const { id } = req.params;
        const  profile = req.body;
        const userProfile = await Profile.create(profile);const user = await User.findById(id);
        user.profile = userProfile._id;
        await user.save()
        res.status(201).json(user);  
    } 
    catch (error) {
        res.status(500).json({
            message: "something went wrong creating user profile, try again later!",
          });
    }
}

async function getUserProfile(req, res) { 
    try{ 
        const { id } = req.params;
        const user = await User.findById(id).populate('profile');
        const userProfile = user.profile;
        res.status(200).json(userProfile);  

    } catch (error) {
        res.status(500).json({
            message: "something went wrong fetching user profile, try again later!",
          });
    }
}

async function updateUserProfile(req, res) { 
    try{ 
        const { id } = req.params;
        const profile = req.body;
        const updatedUserProfile = await User.findByIdAndUpdate(id,profile);
        await updatedUserProfile.save();
        res.status(201).json(updatedUserProfile);  
    } catch (error) {
        res.status(500).json({
            message: "something went wrong updating user profile, try again later!",
          });
    }
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser, createUserProfile, updateUserProfile, getUserProfile, replaceUser };



