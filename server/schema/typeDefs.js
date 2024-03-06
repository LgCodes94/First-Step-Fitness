const typeDefs = `
  type Workout{
    _id: ID!
    name: String
    image: String
    exercises: [Exercise]
  }

  type Exercise {
    _id: ID!
    name: String
    sets: Int
    reps: Int
    duration_minutes: Int
    exercise_type: String
    image: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    exercise: [Exercise]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    workouts: [Workout]
    workout(id: ID!): Workout
    exercises: [Exercise]
    exercise(id: ID!): Exercise
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addWorkout(name: String!, exerciseIds: [ID!]!): User
    addExercise(name: String!, sets: Int!, reps: Int!, duration_minutes: Int): Exercise
    addUserExercise(id: ID!): User
    
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;