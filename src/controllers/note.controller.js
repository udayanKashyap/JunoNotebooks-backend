const catchAsync = require("../utils/errorHandler");
const db = require("../db/prisma");

const getAllNotes = catchAsync(async (req, res) => {
  // const { username } = req.query;
  const username = req.user;
  console.log(req.user);

  const notes = await db.note.findMany({
    where: {
      authorUsername: username,
    },
  });
  res.status(200).send(notes);
});

const getNote = catchAsync(async (req, res) => {
  const { username, id } = req.query;

  const note = await db.note.findUnique({
    where: {
      id: id,
    },
  });

  if (note.authorUsername != username) {
    res.send({ message: "Unauthorized" });
    return;
  }
  res.status(200).send(note);
});

const addNote = catchAsync(async (req, res) => {
  const { username, title, details, content, category } = req.body;
  const note = await db.note.create({
    data: {
      title: title,
      details: details,
      content: content,
      category: category,
      authorUsername: username,
    },
  });
  res.send({ id: note.id });
});

const deleteNote = catchAsync(async (req, res) => {
  const { username, id } = req.query;
  const note = await db.note.findUnique({
    where: {
      id: id,
    },
  });
  if (note == null) {
    res.send({ message: "Note not found" });
    return;
  }
  if (note.authorUsername != username) {
    res.send({ message: "Unauthorized" });
    return;
  }
  await db.note.delete({
    where: {
      id: id,
    },
  });
  res.send({ message: "Note deleted" });
});

const updateNote = catchAsync(async (req, res) => {
  const { username, note } = req.body;
  await db.note.update({
    where: {
      id: note.id,
    },
    data: note,
  });
  res.send({ message: "updated" });
});

module.exports = {
  getAllNotes,
  getNote,
  addNote,
  deleteNote,
  updateNote,
};
