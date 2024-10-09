const express = require('express'); // using express modules
const path = require('path'); 
const fs = require('fs'); // using a file system
const app = express(); // importing express
const port = 8000; // creating a port to run my files

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static('static')); // used just for viewing not running the file
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');// Set the template engineer as pug
app.set('views', path.join(__dirname, 'views')) // 'views' is folder name //

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params); // file we want to run/render
});

// STARTING THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});