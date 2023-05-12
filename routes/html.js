const express = require('express');
const app = require('express').Router();
const path = require('path');

// Sets the GET path for '/notes'.

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// All other routes respond with the index.html file.

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  });
  


module.exports = app;