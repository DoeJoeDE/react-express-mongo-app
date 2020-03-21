// import { Schema, mongo } from "mongoose";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create mongoDB schema for user
const userSchema = new Schema({
    username: { // specify the contents of the user schema
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

// create model based on the user schema
const User = mongoose.model('User', userSchema); // we could paste anything into the field with 'User' 

module.exports = User;