const router = require("express").Router();
const { guest } = require("../middlewares/auth-middleware")
const { register, login } = require("../controllers/auth-controllers");

router.post("/register", guest, register );
router.post("/login", guest, login );

module.exports = router;