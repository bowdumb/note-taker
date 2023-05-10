const fs = require('fs');
const path = require('path');
const app = require('express').Router();
// const uuid = require('../uuid');

let noteData = require('../db/db.json');

// const readFromFile = util.promisify(fs.readFile);

// GET route for the API/Notes
app.get('/api/notes', (req,res) => {
    noteData = JSON.parse(fs.readFileSync('../db/db.json', 'utf-8'));
          res.json(noteData);
          console.log(noteData);
      });
  

// Post route for new notes. newNote variable being used on line 70 of the index.js file to store the content of new notes
// to the db.json file when saving new notes.

app.post('/api/notes', (req, res) => {
    console.log(req.body); //Logging the request body to the console.
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        // unique_id: uuid(),
      }
    noteData.push(newNote);
    console.log('sick')



(fs.writeFile('./db/db.json', JSON.stringify(noteData), err => {
    if(err) {
        console.log('Error Will Robinson!');
    }
})

)});



module.exports = app


// app.get('/api/notes', (req,res) => {
//     const noteData = JSON.parse(fs.readFile('./db/db.json', 'utf-8', (err) => {
//           if(err) {
//               console.log("File read failed.", err);
//               return;
//           }
//           res.json(noteData);
//           // console.log(noteData);
//       }))
//   });