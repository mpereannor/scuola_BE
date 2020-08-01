const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUserProfile
} = require("../controllers/user-controllers");

const { authUser } = require('../../authentication/middlewares/auth-middleware')
router.post("/", createUser);
router.get("/", authUser, getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post('/profile/:id', createUserProfile)

module.exports = router;
