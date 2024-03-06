const db = require('../config/connection');
const { User, Exercise, Workout } = require('../models');
const userSeeds = require('./userSeeds.json');
const workoutSeeds = require('./workoutSeeds.json');
const exerciseSeeds = require('./exerciseSeeds.json')
