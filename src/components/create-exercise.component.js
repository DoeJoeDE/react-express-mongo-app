import React, { Component } from 'react'; // import Component from react
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
    // add a constructor
    constructor(props){
        super(props); // in javascript classes you always need to call super when defining the constructor of a subclass

         // 'this.' in the methods below is supposed to refer to the class 'CreateExercise'
        this.onChangeUsername = this.onChangeUsername.bind(this); // for 'this.' to refer to the right thing we bind it to the respective methods
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // set the initial state of the component
        // state is essentially how you create variables in React
        this.state = {
            // fields corresponding to the entries in out MongoDB database
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: [] // this array will hold already created users in our application
        }
    }

    componentDidMount() { // componentDidMount is a so called life cycle method in React which will always be called at some point, in this case right before anything displays on the page
        // this.setState({
        //     users: ['test user'],
        //     username: 'test user' // create a test user as placeholder
        // })

        axios.get('http://localhost:5000/users')
            .then( res => {
                if(res) {
                // if(res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username), // map each entry for a user to an entry with the corresponding username in the array
                        username: res.data[0].username // take the username of the first user in the database as default
                    })
                }
            })
    }

    // method to change username
    onChangeUsername(e) { // 
        this.setState({ // the recommended way to change a state
            username: e.target.value // set the state to the value of a textbox (the 'target') on the website
            // changing 'username' does not affect the other properties of state (description, duration, date)
        });
    }

    // method to change description
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    // method to change duration
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    // method to change date
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    
    // what is supposed once the submit-button is pressed
    onSubmit(e) {
        e.preventDefault();

        const exercise = { //  in React, inside methods you can create variables if they are only used in that method
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercises/add', exercise) // post the exercise-object to the indicated address
            .then(res => console.log(res.data));

        console.log(exercise);
            
        window.location = "/"; // redirect the user to the homepage, i.e. the list of exercises


    }


    render () {
        return (
        <div>
        {/* form code */}
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}> {/*when the form is submitted (form onSubmit) call 'this.onSubmit' (can contain javascript or various methods) */}
                <div className="form-group">
                    <label>Username: </label> {/* label for the form */}
                    <select ref="userInput" // drop down menu
                        required
                        className="form-control"
                        value={this.state.username}  // default value 
                        // the code below takes the usernames from the database and adds them as options into the dropdown menu
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) { // '.map' allows us to return something for each element in an area
                                // return an option in the select box with value and text taken from the database
                                return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription} //  call the onChange method any time the input in this field is changed
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                    <DatePicker // from npm react-datepicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                    />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
        )
    }
}