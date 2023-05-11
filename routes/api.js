const fs = require('fs');
const path = require('path');
const app = require('express').Router();
const util = require('util');
const express = require('express');

const { v4: uuidv4 } = require('uuid');

let noteData = require('../db/db.json');


// const readFromFile = util.promisify(fs.readFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET route for the API/Notes

app.get('/api/notes', (req, res) => {
  noteData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json'), 'utf-8'));
  res.json(noteData);
  // console.log(noteData);
});

  

// Post route for new notes. newNote variable being used on line 70 of the index.js file to store the content of new notes
// to the db.json file when saving new notes.

app.post('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf-8', function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    const newNote = {
      unique_id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
      
    };
    noteData.push(newNote);

    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(noteData, null, 2), function (err) {
      if (err) {
        console.error(err);
      } else {
        console.info('Successfully posted new note!');
      }
      res.json(noteData);
    });
  });
});


module.exports = app