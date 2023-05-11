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
      id: uuidv4(),
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

app.delete('/api/notes/:id', (req, res) => {
  const noteForDeleting = req.params.id;
  const deleteDB = [];
  for (let i = 0; i < noteData.length; i++) {
    if (noteData[i].id != noteForDeleting) {
      deleteDB.push(noteData[i]);
    }
  }
  noteData = deleteDB;

  fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(noteData, null, 2), function (err) {
    if (err) {
      console.error(err);
    } else {
      console.info('Successfully deleted your note.');
    }
    res.json(noteData);
});
});


module.exports = app

// app.delete('/api/notes/:unique_id', (req, res) => {
//   const noteId = req.params.unique_id;
//   fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf-8', (err, data) => {
//     const filterNote = JSON.parse(data);
//     const afterDelete = filterNote.filter((note) => note.id !== noteId);
    