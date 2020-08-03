const router = require('express').Router();

const { 
    createUpdate,
    getUpdates,
    getUpdate,
    removeUpdate,
    // upvoteUpdate,
    // downvoteUpdate,
}  = require('../controllers/update-controllers');

// updates
router.post('/', createUpdate);
router.get('/', getUpdates);
router.get('/:id', getUpdate);
router.delete('/:id', removeUpdate);
// router.post('/:id', upvoteUpdate);
// router.post('/:id', downvoteUpdate);

module.exports = router;
