const catchAsync = require("../utils/errorHandler");
const db = require("../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addUser = catchAsync(async (req, res) => {
  const { username } = req.body;
  const password = await bcrypt.hash(req.body.password, 10);
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });
  if (user == null) {
    await db.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    res.status(201).send({ message: "User created successfully." });
  } else {
    res.status(500).send({ message: "Username already exists." });
  }
});

const loginUser = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });
  if (user == null) {
    res.status(400).send("Username does not exist!");
    return;
  }
  const passwordMatched = await bcrypt.compare(password, user.password);
  if (passwordMatched) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" },
    );
    res.status(200).send({
      username: user.username,
      token,
    });
  } else {
    res.status(400).send("Passwords do not match");
  }
});

module.exports = {
  addUser,
  loginUser,
};
