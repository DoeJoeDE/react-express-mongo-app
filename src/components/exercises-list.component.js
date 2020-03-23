import React, { Component } from 'react'; // import Component from react
import { Link } from 'react-router-dom';
import axios from 'axios';

// the exercises-list.component.js file contains two components, 'Exercise' and 'ExerciseList'

// the 'Exercise' component is implemented as a functional React component lacking state and lifecycle methods
// if all a component has to do is accept props and return JSX, you should use a functional component instead of class component
const Exercise = props => ( // this component effectively returns a row of the table
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a> {/* best practice would be to use a 'btn' instead of a link 'a' here since the link does not go anywhere */}
        </td>
    </tr>
)

// 'ExerciseList' is implemented as a class component
export default class ExerciseList extends Component {

    constructor(props){
        super(props); // always start with super(props) (why?)

        this.deleteExercise = this.deleteExercise.bind(this); // for 'this.' to refer to the right thing we bind it to the respective methods

        this.state = {exercises: []}; // initialize the state
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                this.setState({exercises: res.data})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));
        this.setState({
                exercises: this.state.exercises.filter(el  => el._id !== id) // set the array of exercises equal to all exercises except that with the id of the on desginated to be deleted
        })
    }


    exerciseList() {
        return this.state.exercises.map(currentExercise => { // return for every element in the exercises array the output / component specified below
            return <Exercise exercise = {currentExercise} deleteExercise = {this.deleteExercise} key = {currentExercise._id}/>; // component with 3 props eventually acting as the rows of our table
        })
    }


    render () {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() } {/* call the exerciseList method which will return the rows of the table from the database */}
                    </tbody>
                </table>
                
            </div>
        )
    }
}