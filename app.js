const express = require("express");
const app = express();
const cors = require("cors");
const handleUserAuth = require("./src/middleware/userAuth");
const userRouter = require("./src/routes/user.route");
const noteRouter = require("./src/routes/note.route");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/user", userRouter);
app.use("/note", handleUserAuth, noteRouter);

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message, stack: error.stack });
});
app.listen(4000, () => {
  console.log("server running on port http://localhost:4000");
});
