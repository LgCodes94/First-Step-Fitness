const { Schema, model } = require('mongoose');

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  exercise: [{
    type: Schema.Types.ObjectId,
    ref: 'Exercise'
  }]
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;