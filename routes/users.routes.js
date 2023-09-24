const express = require("express");
const users = require("../controllers/users.controllers");

const router = express.Router();

router.get("/", users.getUsers);
router.get("/:id", users.getUserById);
router.post("/signup", users.signupUser);
router.post("/login", users.loginUser);
router.delete("/:id", users.deleteUserById);

module.exports = router;
