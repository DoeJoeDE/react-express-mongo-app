import React, { Component } from 'react'; // import Component from react
import axios from 'axios';

export default class CreateUser extends Component {
    // add a constructor
    constructor(props){
        super(props); // in javascript classes you always need to call super when defining the constructor of a subclass

        // 'this.' in the methods below is supposed to refer to the class 'CreateUser'
        this.onChangeUsername = this.onChangeUsername.bind(this); // for 'this.' to refer to the right thing we bind it to the respective methods
        this.onSubmit = this.onSubmit.bind(this);

        // set the initial state of the component
        // state is essentially how you create variables in React
        this.state = {
            // fields corresponding to the entries in out MongoDB database
            username: ""
        }
    }

    // method to change username
    onChangeUsername(e) { // 
        this.setState({ // the recommended way to change a state
            username: e.target.value // set the state to the value of a textbox (the 'target') on the website
        });
    }

    // what is supposed once the submit-button is pressed
    onSubmit(e) {
        e.preventDefault();

        const user = { //  in React, inside methods you can create variables if they are only used in that method
            username: this.state.username
        }
        
        console.log(user);

        axios.post('http://localhost:5000/users/add', user) // post the user-object to the indicated address
            .then(res => console.log(res.data));

        this.setState({
            username: '' // set the username to blank so that new additional users can be entered
        })
    }


    render () {
        return (
            <div>
            {/* form code */}
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}> {/*when the form is submitted (form onSubmit) call 'this.onSubmit' (can contain javascript or various methods) */}
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}  // default value 
                            // the code below takes the usernames from the database and adds them as options into the dropdown menu
                            onChange={this.onChangeUsername}
                        />
                    </div>  

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}