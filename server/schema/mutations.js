const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt
} = graphql;
const mongoose = require("mongoose");
const AuthService = require("../services/auth")

const UserType = require("./types/user_type")
const User = mongoose.model("user")

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    
    register: {
      type: UserType,
      args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          phone_number: { type: GraphQLFloat },
          password: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
          phone_number: { type: GraphQLFloat },
          password: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
          token: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.verifyUser(args);
      }
    }
    
  }
});

module.exports = mutation;