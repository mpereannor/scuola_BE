const router = require('express').Router();

const { 
    createUpdate,
    getUpdates,
    getUpdate,
    removeUpdate,
    // upvoteUpdate,
    // downvoteUpdate,
    submitReport,
    readReports,
    readReport,
    changeReport,
    closeReport
}  = require('../controllers/report-controllers');

//report
router.post("/", submitReport);
router.get('/', readReports);
router.get('/:id', readReport);
router.put('/:id', changeReport);
router.delete('/:id', closeReport);


//updates
router.post('/updates', createUpdate);
router.get('/updates', getUpdates);
router.get('/updates/:id', getUpdate);
router.delete('/updates/:id', removeUpdate);
// router.post('/:id', upvoteUpdate);
// router.post('/:id', downvoteUpdate);


module.exports = router;