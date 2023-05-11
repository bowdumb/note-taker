const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const app = require('express').Router();
const util = require('util');
const express = require('express');

const { v4: uuidv4 } = require('uuid');

let noteData = require('../db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET route for the API/Notes

app.get('/api/notes', (req, res) => {
  noteData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json'), 'utf-8'));
  res.json(noteData);
  // console.log(noteData);
});

  

// Post route for new notes. newNote variable being used on line 70 of the index.js file to store the content of new notes
// to the db.json file when saving new notes. In order to make a new post we are reading the database file, creating a new note object
// that contains the keys we would like to include with our post, and then pushing the new post to the back of the noteData array which
// is synonymous with our database.

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
// The code below writes the contents of our noteData array to the db.json file after converting the noteData array into a JSON string. This completes the post, as the new note
// is written to our database.
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(noteData, null, 2), function (err) {
      if (err) {
        console.error(err);
      } else {
        console.info(`Successfully posted your note about ${req.body.title}!`);
      }
      res.json(noteData);
    });
  });
});

// Delete route for existing notes. When a delete request is made the ID from the note the user is deleting is assigned to the noteForDeleting variable, then an empty array is created and assigned to the deleteDB variable. 
// A for loop is initiated, which checks each note id in the database to see if the id matches the one the user is trying to delete. Notes that do not have the corresponding id are 
// added to the deleteDB array. Once the loop concludes, noteData is assigned to deleteDB, in order to rewrite the database with the deleted note no longer in it.

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
      console.info(`Successfully deleted your note!`);
    }
    res.json(noteData);
});
});


module.exports = app