import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());

// Route 1 : ทดสอบ server
app.get("/", (_req, res) => {
  try {
    res.status(200).send("Hello, This is API server");
  } catch (error) {
    next(error);
  }
});

let notes = [];

// Route 2 : Create note
app.post("/notes", (req, res) => {
  const { title, content, tags = [] } = req.body;
  const newNote = {
    id: String(notes.length + 1),
    title,
    content,
    tags,
  };

  notes.push(newNote);
  res.status(200).json(newNote);
});

// Route 3 : Read all notes
app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});

// Route 4 : Delete note
app.delete("/notes/:id", (req, res) => {
  try {
    const noteId = req.params.id;
    const noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);
      res.status(200).send(`Note with ID ${noteId} Deleted!`);
    } else {
      res.status(404).send("Note not found");
    }
  } catch (error) {
    next(error);
  }
});

// Route 5 : Update note
app.put("/notes/:id", (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content, tags } = req.body;
    const note = notes.find((n) => n.id === noteId);

    if (note) {
      if (title !== undefined) note.title = title;
      if (content !== undefined) note.content = content;
      if (tags !== undefined) note.tags = tags;

      res.status(200).json(note);
    } else {
      res.status(404).send("Note not found");
    }
  } catch (error) {
    next(err);
  }
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🎉`);
});
