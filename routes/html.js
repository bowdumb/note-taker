const express = require('express');
const app = require('express').Router();
const path = require('path');

// Sets the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  });
  
// Sets the GET path for '/notes'
  app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  

module.exports = app;