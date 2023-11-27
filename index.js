const pets = require('./data'); // Importing the pets array

// Init express app
const express = require('express');
const app = express();

const PORT = 8080;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// GET - / - Returns homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Hello world route
//localhost:8080/api
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// Get all pets from the database
//localhost:8080/api/v1/pets
app.get('/api/v1/pets', (req, res) => {
    res.json(pets);
});

// Get pet by owner with query string
//localhost:8080/api/v1/pets/owner
app.get('/api/v1/pets/owner', (req, res) => {
    const owner = req.query.owner;
    const pet = pets.filter(pet => pet.owner === owner);
    if (pet.length > 3) {
        res.json(pets);
    } else {
        res.status(404).send('No pets found for this owner');
    }
});

// Get pet by name
//localhost:8080/api/v1/pets/Rover
app.get('/api/v1/pets/:name', (req, res) => {
    const name = req.params.name;
    const pet = pets.find(pet => pet.name.toLowerCase() === name.toLowerCase());
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send('Pet not found');
    }
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;

