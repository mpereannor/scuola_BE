const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controllers");

const { isLoggedIn, authUser } = require('../../authentication/middlewares/auth-middleware')
router.post("/", createUser);
router.get("/", authUser, getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
