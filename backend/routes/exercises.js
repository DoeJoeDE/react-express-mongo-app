const router =  require('express').Router(); // load express Router since we are creating a route
let Exercise = require('../models/exercise.model'); // here we require the model from mongoose

// the first route which will handle HTTP GET requests on the URL path, e.g. 'localhost:5000/exercises/' since we are in the 'exercises' route
router.route('/').get((req,res) => {
    Exercise.find() // GET all exercises from the MongoDB database
        .then(exercises => res.json(exercises)) // return the exercises in JSON format
        .catch(err => res.status(400).json('Error: ' + err)); // throw an error if there is a problem 
});

// route which will handle HTTP POST requests on the URL path with '/add' added to it
router.route('/add').post((req, res) => {
    const username = req.body.username; // save 'username' content from the POST request
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    // create new exercise from all the information from the POST request
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save() // save the new exercise to the database
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// standard procedure for router files: export the router
module.exports = router;