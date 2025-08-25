import express from "express";

const router = express.Router();
// Route 1
router.get("/", (_req, res) => {
  try {
    res.status(200).send("Hello, This is API server");
  } catch (error) {
    next(error);
  }
});

let notes = [];

// Route 2 : Create note
router.post("/notes", (req, res) => {
  try {
    const { title, content, tags = [] } = req.body;
    if (!title || !content) {
      const error = new Error("Title and content are required");
    }
    const newNote = {
      id: String(notes.length + 1),
      title,
      content,
      tags,
    };

    notes.push(newNote);
    res.status(200).json(newNote);
  } catch (error) {
    next(error);
  }
});

// Route 3 : Read all notes
router.get("/notes", (req, res) => {
  res.status(200).json(notes);
});

// Route 4 : Delete note
router.delete("/notes/:id", (req, res, next) => {
  try {
    const noteId = req.params.id;
    const noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);

      res.status(200).send(`Note with ID ${noteId} Deleted!`);
    } else {
      const error = new Error("Note not found.");
      error.status = 404;
      return next(error);
    }
  } catch (err) {
    next(err);
  }
});

// Route 5 : Update note
router.put("/notes/:id", (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content, tags } = req.body;
    const note = notes.find((n) => n.id === noteId);

    if (note) {
      if (title !== undefined) note.title = title;
      if (content !== undefined) note.content = content;
      if (tags !== undefined) note.tags = tags;

      res.status(200).json(notes);
    } else {
      const error = new Error("Note not found.");
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    next(err);
  }
});
export default router;
