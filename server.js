const express = require('express');

const path = require('path');
const app = express();


const apiRoutes  = require('./routes/api');
app.use(apiRoutes);
// const htmlRoute = require('./routes.html.js');


const PORT = process.env.PORT || 3001;

// Enables middleware functionality
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use(htmlRoute);
// app.use(require('./routes/html'));

// Enables the static use of our 'public' folder which will contain all of the frontend content.
app.use(express.static('public'));

// Sets the default page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', function (req,res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});









app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });