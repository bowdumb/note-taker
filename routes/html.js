const express = require('express');
const app = require('express').Router();
const path = require('path');

// Sets the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  });
  
// Sends the user back to the homepage if they type in a URL that we do not have routing for.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  }); 

// Sets the GET path for '/notes'
  app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  

module.exports = app;