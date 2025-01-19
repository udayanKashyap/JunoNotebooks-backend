const catchAsync = require("../utils/errorHandler");
const db = require("../db/prisma");

const addUser = catchAsync(async (req, res) => {
  const { username, password } = req.body;
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
    res.send({ message: "User created successfully." });
  } else {
    res.send({ message: "Username already exists." });
  }
});

module.exports = {
  addUser,
};
