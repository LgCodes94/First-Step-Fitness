const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of exercise names
  },
  sets: {
    type: Number,
    required: false,
  },
  reps: {
    type: Number,
    required: false,
  },
  duration_minutes: {
    type: Number,
    required: false,
  },
  exercise_type: {
    type: String,
  },
  image: {
    type: String,
  }
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;