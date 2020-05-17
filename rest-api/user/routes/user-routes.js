const router = require("express").Router();
const { createUser } = require("../controllers/user-controllers");

router.post("/", createUser);

module.exports = router;
