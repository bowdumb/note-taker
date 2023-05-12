const express = require('express');
const htmlRoute = require('./routes/html.js');
const apiRoutes  = require('./routes/api.js');
const path = require('path');
const app = express();
app.use(apiRoutes);
app.use(htmlRoute);


//assigns the port that express will use to either 3001 or if 3001 is occupied, another available port.
const PORT = process.env.PORT || 3001;

// Enables middleware functionality
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./routes/html'));




// Enables the static use of our 'public' folder which will contain all of the front-end content.
app.use(express.static('public'));







app.listen(PORT, () => {
    console.log(`Note-Taker is listening at http://localhost:${PORT}`);
  });