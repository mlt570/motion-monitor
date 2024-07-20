// import mongoose library
const mongoose = require('mongoose')

// create a Schema class using the mongoose library
const Schema = mongoose.Schema

// define a new schema for workouts
// define title, reps, load fields
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true }) // add time stamps

// export workout model, based on workoutSchema
module.exports = mongoose.model('Workout', workoutSchema)

