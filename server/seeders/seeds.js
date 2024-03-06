const db = require('../config/connection');
const { User, Exercise, Workout } = require('../models');
const userSeeds = require('./userSeeds.json');
const workoutSeeds = require('./workoutSeeds.json');
const exerciseSeeds = require('./exerciseSeeds.json');
const { armsSeeds, backseeds, cardioSeeds, chestSeeds, cardioSeeds, legsSeeds, shouldersSeeds } = require('../workout_types');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Workout', 'workouts');
    await cleanDB('Exercise', 'exercise');
    await cleanDB('User', 'user');
    await createImageBitmap('userSeeds');

    for (let i = 0; i < exerciseSeeds.length; i++) {
      const { _id, exercise } = await Exercise.create(exerciseSeeds[i]);
    }

    for (let i = 0; i < workoutSeeds.length; i++) {
      const { _id, exercise } = await Workout.creat(workoutSeeds[i]);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('all done!');
  process.exit(0);
});