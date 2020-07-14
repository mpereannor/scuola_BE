const { Profile }  = require('../models/profile-models');

async function createProfile(req, res) { 
    try{ 
        const profile = await Profile.create(req.body);
        res.status(201).json(profile);
    } catch(error){ 
        res.status(500).json({
            message: 'something went wrong creating profile, try again later!',
      error: error.message,
        });
    }
} 

async function updateProfile(req, res) { 
    try { 
        const { id } = req.params;
        const updatedProfile = await Profile.findByIdAndUpdate(id, req.body);
        res.status(201).json(updatedProfile);
    } catch(error) { 
        res.status(500).json({
            message: 'something went wrong updating profile, try again later',
      error: error.message,
        })
    }
}

module.exports = { createProfile, updateProfile };