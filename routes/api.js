const fs = require('fs');
const path = require('path');
const app = require('express').Router();
const util = require('util');
const express = require('express');
// const uuid = require('../uuid');

let noteData = require('../db/db.json');
console.log(noteData);

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
// app.post('/api/notes', (req, res) => {
//     fs.readFile((path.join(__dirname, '..', 'db', 'db.json'), 'utf-8'))
//     .then(function (data) {
//     const noteData = JSON.parse(data);
//     const newNote = req.body;
//       noteData.push(newNote);
//       console.log(req.body)
//     })

//         fs.writeFile(path.join(__dirname, '../db.db.json', JSON.stringify(noteData, null, 2),
//         (writeErr) =>
//           writeErr
//             ? console.error(writeErr)
//             : console.info('Successfully posted new note!')
//         ))
//       }
//     );
app.post('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf-8', function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    // noteData = JSON.parse(data);
    const newNote = {
      title: req.body.title,
      text: req.body.text
    };
    noteData.push(newNote);
    console.log(newNote)

    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(noteData, null, 2), function (writeErr) {
      if (writeErr) {
        console.error(writeErr);
      } else {
        console.info('Successfully posted new note!');
      }
    });
  });
});



// app.post('/notes', (req, res) => {
//     readFromFile(path.join(__dirname, '..', 'db', 'db.json')).then((data) => {
//       noteData = JSON.parse(data);
    
//       const newNote = {
//         title: req.body.title,
//         text: req.body.text,
//         // unique_id: uuid(),
//       };
//       console.log(newNote)
//     noteData.push(newNote);
//     res.sendStatus(200);

    

//     fs.writeFile('../db/db.json'), JSON.stringify(noteData), (err) => {
//         if (err) {
//           console.log('Error writing file:', err);
//           res.status(500).send('Error writing file');
//           return;
//         }
//         console.log('New note:', newNote);
//         res.sendStatus(200);
//         };
//     })
//       .catch((err) => {
//         console.log('Error reading file!', err);
//         res.status(500).send('error reading file');
//       });
// });



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