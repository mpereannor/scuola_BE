const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  replaceUser,
  deleteUser,
  createUserProfile,
    uploadAvatar,
    displayAvatar,
  getUserProfile,
} = require("../controllers/user-controllers");

const {
  authUser,
} = require("../../authentication/middlewares/auth-middleware");

const { 
    upload
} = require('../middlewares/user-middlewares')

const { 
    updatePosition
} = require("../../authentication/controllers/auth-controllers");

router.post("/", createUser);
router.get("/", authUser, getUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.put("/:id", replaceUser);
router.delete("/:id", deleteUser);
router.put("/:id/profile", createUserProfile);
router.get("/:id/profile", getUserProfile);
router.get('/profile/:id/avatar', displayAvatar);

router.patch("/:id/position/", updatePosition)

//avatar
router.post('/profile/:id/avatar', upload.single('avatar'), uploadAvatar);

module.exports = router;
