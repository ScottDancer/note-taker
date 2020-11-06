const fs = require("fs");
const router = require("express").Router();
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
router.get("/api/notes", (req, res) => {
  readFile("../db/db.json", "utf8")
    .then((data) => {
      const notes = JSON.parse(data) || [];
      res.json(notes);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/notes", (req, res) => {
  req.body;
  readFile("../db/db.json", "utf8")
    .then((data) => {
      const notes = JSON.parse(data) || [];
      notes.push(req.body);
      writeFile("../db/db.json", notes).then(() => {
        res.json(notes);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
