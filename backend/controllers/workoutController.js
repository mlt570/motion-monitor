// import the workout model and mongoose library
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user._id
    // find all workouts in the database, sorted by creation date in descending order
    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})

    // send workouts as a json response with a status of 200- means that it is working
    res.status(200).json(workouts)

}

// get a single workout by ID
const getWorkout = async (req, res) => {
    // extract id from request parameters
    const { id } = req.params
    // check if provided ID is a valid mongodb ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    // find workout id in the database
    const workout = await Workout.findById(id)

    // if no workout found, send a 404 response with error message
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    // otherwise send workout as a json response with a 200 status meaning that it is working
    res.status(200).json(workout)

}

// create a new workout
const createWorkout = async (req, res) => {
    // extract title, load, reps from req body
    const {title, load, reps} = req.body

    // arr used to trakc empty required fields
    let emptyFields = []

    // check for empty fields and add them to array
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    // send error message if there are empty fields
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // add new workout to database
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout) // send new workout as json response
    } catch (error) {
        res.status(400).json({error: error.message}) // send 400 response with error message
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

// export functions so can use in other parts of application
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}