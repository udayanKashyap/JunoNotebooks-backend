const express = require("express");
const router = express.Router();
const { addUser, loginUser } = require("../controllers/user.controller");

router.post("/register", addUser);
router.post("/login", loginUser);

module.exports = router;
