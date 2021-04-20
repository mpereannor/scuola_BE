const router = require("express").Router();
const {
  register,
  login,
//   home,
//   updatePosition,
//   authenticateToken
} = require("../controllers/auth-controllers");

const { validatePassword } = require("../middlewares/auth-validation")

router.post("/register", register);
router.post("/login", 
// validatePassword,
 login);
// router.post("/token", createToken);
// router.delete("/logout", logout)
// router.post("/logout", authUser, logout);
// router.get("/home", authUser, home);
// router.patch("/:id/position/", updatePosition);
// router.patch("/:id", updatePosition);
// router.patch("/:id/position/", updatePosition);
module.exports = router;
