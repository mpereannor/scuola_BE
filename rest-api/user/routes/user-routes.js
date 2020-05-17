const router = require('express').Router()
const { createUser } = require('../controllers/user-controllers')

router.post('/user', createUser )

module.exports = router