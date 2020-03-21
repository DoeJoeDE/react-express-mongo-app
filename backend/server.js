// require the packages used in the project
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// the express server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// create connection with MongoDB
const uri = process.env.ATLAS_URI; // set database uri, i.e. the connection string for the respective MongoDB account/project, as environment variable
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }); // the arguments in connect() handle ensure that the connection is "compatible" with MongoDB

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


// import exercises and users router
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// use the files from the router directories
app.use('/exercises', exercisesRouter); // if someone goes to the url and puts /exercises at the end, load everything in the exercisesRouter
app.use('/users', usersRouter); // if someone goes to the /users router, load everything in the usersRouter


// start the server listening on a given port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});