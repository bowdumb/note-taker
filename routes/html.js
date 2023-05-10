const express = require('express');
const app = express();

// Sets the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/index.html'))
  });
  
// Sets the GET path for '/notes'
  app.get('/notes', (req,res) => {
    res.sendFile(path.join(_dirname, '../public/notes.html'));
  });
  

module.exports = app;