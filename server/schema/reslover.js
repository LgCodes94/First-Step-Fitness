const { Workout, Exercise, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (_, vars, context) => {
      if (context.user) {
        return User.findone({ _id: context.user._id }).populate('exercise')
      }
    },
    workouts: async () => {
      try {
        const workouts = await Workout.find();
        return workouts;
      } catch (err) {
        throw new Error(err);
      }
    },
    workout: async (_, { id }) => {
      try {
        const workout = await Workout.findById(id);
        return workout;

      } catch (err) {
        throw new Error(err);
      }
    },
    exercise: async () => {
      try {
        const exercises = await Exercise.find();
        return exercises;
      } catch (err) {
        throw new Error(err);
      }
    },
    exercise: async (_, { id }) => {
      try {
        const exercise = await Exercise.findById(id).populate('image');
        return exercise;
      } catch (err) {
        throw new Error(err);
      }
    },
    Mutation: {
      addProfile: async (parent, { name, email, password }) => {
        const user = await Profile.create({ name, email, password });
        const token = signToken(profile);

        return { token, profile };
      },

      login: async (parent, { email, password }) => {
        const profile = await Profile.findOne({ email });
        if (!user) {
          throw AuthenticationError;
        }
        const correctPw = await profile.isCorrectPassword(password);
        if (!correctPw) {
          throw AuthenticationError;
        }
        const token = signToken(user);
        return { token, user };
      },
      addWorkout: async (_, { name, image, exerciseIds }, context) => {
        console.log(context);
        const workout = new Workout({
          name,
          image,
          exercises: exerciseIds
        });
        try {
          const result = await workout.save();
          return result;
        } catch (err) {
          throw new Error(err);
        }
      },
      addExercise: async (_, { name, sets, reps, duration_minutes, exercise_type, image }) => {
        const exercise = new Exercise({
          name,
          // sets,
          // reps,
          // duration_minutes,
          exercise_type,
          image
        });
        try {
          const result = await exercise.save();
          return result;
        } catch (err) {
          throw new Error(err);
        }
      },
      addUserExercise: async (_, { id }, context) => {

        console.log(context.user.data)

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { exercise: id } },
          { new: true }
        ).populate('exercise')
        return user;
      }
    },
  },
};

module.exports = resolvers;