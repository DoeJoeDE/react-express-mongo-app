const router =  require('express').Router(); // load express Router since we are creating a route
let User = require('../models/user.model'); // here we require the model from mongoose

// the first route which will handle HTTP GET requests on the URL path, e.g. 'localhost:5000/users/' since we are in the 'users' route
router.route('/').get((req,res) => {
    User.find() // GET all users from the MongoDB database
        .then(users => res.json(users)) // return the users in JSON format
        .catch(err => res.status(400).json('Error: ' + err)); // throw an error if there is a problem 
});

// route which will handle HTTP POST requests on the URL path with '/add' added to it
router.route('/add').post((req, res) => {
    const username = req.body.username; // save 'username' content from the POST request

    const newUser = new User({username}); // create a new instance of user with the username from above

    newUser.save() // save the new user to the database
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// standard procedure for router files: export the router
module.exports = router;