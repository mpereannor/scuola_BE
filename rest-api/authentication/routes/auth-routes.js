const router = require("express").Router();
// const { guest, authUser } = require("../middlewares/auth-middleware");
const {
  register,
  login,
//   home,
//   updatePosition,
//   authenticateToken
} = require("../controllers/auth-controllers");

router.post("/register", register);
router.post("/login", login);
// router.post("/token", createToken);
// router.delete("/logout", logout)
// router.post("/logout", authUser, logout);
// router.get("/home", authUser, home);
// router.patch("/:id/position/", updatePosition);
// router.patch("/:id", updatePosition);
// router.patch("/:id/position/", updatePosition);
module.exports = router;
