const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Server Running");
});

app.listen(4000, () => {
  console.log("server running on port http://localhost:4000");
});
