const fs = require("fs");
const router = require("express").Router();
const util = require("util");
const {v4:uuidv4}= require("uuid")
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
router.get("/api/notes", (req, res) => {
  readFile("db/db.json", "utf8")
    .then((data) => {
      const notes = JSON.parse(data) || [];
      res.json(notes);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/notes", (req, res) => {
  readFile("db/db.json", "utf8")
    .then((data) => {
      const notes = JSON.parse(data) || [];
      const newNotes = req.body
      newNotes.id = uuidv4()
      notes.push(req.body);
      writeFile("db/db.json", JSON.stringify(notes)).then(() => {
        res.json(notes);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/api/notes/:id", (req, res) => {
  readFile("db/db.json", "utf8")
    .then((data) => {
      const notes = JSON.parse(data) || [];
      const newNotes = notes.filter(note => note.id !== req.params.id)
      writeFile("db/db.json", JSON.stringify(newNotes)).then(() => {
        res.json(newNotes);
      });
    })
    .catch((err) => {
      console.log(err);
    });

})

module.exports = router
