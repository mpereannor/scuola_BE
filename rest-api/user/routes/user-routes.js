const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  replaceUser,
  deleteUser,
  createUserProfile,
  updateUserProfile,
  getUserProfile
} = require("../controllers/user-controllers");

const { authUser } = require('../../authentication/middlewares/auth-middleware')
router.post("/", createUser);
router.get("/", authUser, getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.put('/:id', replaceUser)
router.delete("/:id", deleteUser);

router.post('/profile/:id', createUserProfile);
router.get('/profile/:id', getUserProfile)
router.put('/profile/:id', updateUserProfile);

module.exports = router;
