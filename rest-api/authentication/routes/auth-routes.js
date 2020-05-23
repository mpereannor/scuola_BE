const router = require('express').Router();
const { guest } = require('../middlewares/auth-middleware')
const { register } = require('../controllers/auth-controllers')


router.post('/register',
 guest, 
 register );

module.exports = router;