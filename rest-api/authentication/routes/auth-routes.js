const router = require("express").Router();
const { guest, authUser } = require("../middlewares/auth-middleware");
const {
  register,
  login,
  logout,
  home,
} = require("../controllers/auth-controllers");

router.post("/register", guest, register);
router.post("/login", guest, login);
router.post("/logout", authUser, logout);
router.get("/home", authUser, home);

module.exports = router;
