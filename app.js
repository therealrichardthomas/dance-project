const express = require('express'); // using express modules
const path = require('path'); 
const fs = require('fs'); // using a file system
const app = express(); // importing express
const mongoose = require('mongoose'); // using mongoose
const bodyparser = require('body-parser');
const port = 8000; // creating a port to run my files


// starting the mongoose database
mongoose.connect('mongodb://127.0.0.1:27017/contactDance'); // contactDance is the db

//defining mongoose schema
const contactSchema = new mongoose.Schema({
    phone: String,
    name: String,
    email: String,
    address: String,
    desc: String
});

//compiling into a contacts collection
const Contact = mongoose.model('Contact', contactSchema); 

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

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params); // file we want to run/render
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body); // creates a new contact object from the request

    myData.save().then(() => {
        res.send("This item has been saved to the database."); // if saved then sends this message
    }).catch(() => {

        // if not saved, an error has been produced and sends this message
        res.status(400).send("This item has not been saved to the database."); 
    })
});

// STARTING THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});