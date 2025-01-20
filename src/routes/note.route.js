const express = require("express");
const router = express.Router();
const {
  addNote,
  getAllNotes,
  deleteNote,
  updateNote,
  getNote,
} = require("../controllers/note.controller");

router.get("/all", getAllNotes);
router.post("/", addNote);
router.delete("/", deleteNote);
router.post("/update", updateNote);

module.exports = router;
