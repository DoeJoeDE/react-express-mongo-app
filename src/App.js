import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // import features from react-router-dom that make it easier to route different URLs to different React components
// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css" // import bootstrap css

// import the components of the app
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercises.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      {/* Navbar is also a React component */}
      <div className="container">
        <Navbar /> 
        <br/>
        {/* set the routes for the individual components */}
        <Route path="/" exact component = {ExerciseList} /> 
        <Route path="/edit/:id" exact component = {EditExercise} />
        <Route path="/create" exact component = {CreateExercise} />
        <Route path="/user" exact component = {CreateUser} />
      </div>
    </Router>

      /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
      
  );
}

export default App;
