// import { Schema, mongo } from "mongoose";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create mongoDB schema for exercise
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

// create model based on the exercise schema
const Exercise = mongoose.model('Exercise', exerciseSchema); // we could paste anything into the field with 'User' 

module.exports = Exercise;