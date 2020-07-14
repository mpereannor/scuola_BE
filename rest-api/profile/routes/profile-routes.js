const router = require('express').Router();
const { 
    createProfile,
    updateProfile
} = require('../controllers/profile-controllers');

router.post('/', createProfile);
router.put('/:id', updateProfile);

module.exports = router;