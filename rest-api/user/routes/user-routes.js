const router = require("express").Router();
const { createUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user-controllers");

router.post("/", createUser);
router.get("/", getUsers);
router.get('/:id', getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
