// // graphql.js
// const { ApolloServer, gql } = require('apollo-server');
// const { GraphQLJSON } = require('graphql-scalars');
// const prisma = require('./prisma');

// const typeDefs = gql`
//   scalar JSON

//   type ActivityLog {
//     id: Int!
//     action: String!
//     createdAt: String!
//     updatedAt: String!
//     payload: JSON
//   }

//   input CreateActivityLogInput {
//     action: String!
//     payload: JSON
//   }

//   input UpdateActivityLogInput {
//     action: String
//     payload: JSON
//   }

//   type Query {
//     activityLogs: [ActivityLog!]!
//     activityLog(id: Int!): ActivityLog
//   }

//   type Mutation {
//     createActivityLog(input: CreateActivityLogInput!): ActivityLog!
//     updateActivityLog(id: Int!, input: UpdateActivityLogInput!): ActivityLog!
//     deleteActivityLog(id: Int!): Boolean!
//   }
// `;

// const resolvers = {
//   JSON: GraphQLJSON,
//   Query: {
//     activityLogs: async () => {
//       return prisma.activityLog.findMany();
//     },
//     activityLog: async (parent, { id }) => {
//       return prisma.activityLog.findUnique({ where: { id: parseInt(id) } });
//     },
//   },

//   Mutation: {
//     createActivityLog: async (parent, { input }) => {
//       const { action, payload } = input;
//       return prisma.activityLog.create({
//         data: {
//           action,
//           payload
//         },
//       });
//     },
//     updateActivityLog: async (parent, { id, input }) => {
//       const { action, payload } = input;
//       return prisma.activityLog.update({
//         where: { id: parseInt(id) },
//         data: {
//           action, 
//           payload
//         },
//       });
//     },
//     deleteActivityLog: async (parent, { id }) => {
//       await prisma.activityLog.delete({
//         where: { id: parseInt(id) },
//       });
//       return true;
//     },
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers });

// module.exports = server;


// //activityLogs
// // query {
// //   activityLogs {
// //     id
// //     action
// //     createdAt
// //     updatedAt
// //     payload
// //   }
// // }

// //activityLog
// // query {
// //   activityLog(id: 1) {
// //     id
// //     action
// //     createdAt
// //     updatedAt
// //     payload
// //   }
// // }

// // createActivityLog
// // mutation {
// //   createActivityLog(input: {
// //     action: "Performed an action"
// //     payload: {
// //       key1: "value1"
// //       key2: "value2"
// //     }
// //   }) {
// //     id
// //     action
// //     createdAt
// //     updatedAt
// //     payload
// //   }
// // }

// // updateActivityLog
// // mutation {
// //   updateActivityLog(id: 1, input: {
// //     action: "Updated action"
// //     payload: {
// //       key1: "updatedValue1"
// //       key2: "updatedValue2"
// //     }
// //   }) {
// //     id
// //     action
// //     createdAt
// //     updatedAt
// //     payload
// //   }
// // }

// // deleteActivityLog
// // mutation {
// //   deleteActivityLog(id: 1)
// // }

