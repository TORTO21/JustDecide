const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

const UserType = require('../types/user_type')
const User = require('../../models/User')
const AuthService = require('../../services/auth')

const userMutations = {
  // NOTE: Temporarily added to easily add user intil Auth is ready
  // newUser: {
  //   type: UserType,
  //   args: {
  //     phone_hash: { type: GraphQLString },
  //     status: { type: GraphQLString }
  //   },
  //   resolve(_, { phone_hash, status }) {
  //     return new User({
  //       phone_hash,
  //       status
  //     }).save()
  //   },
  register: {
    type: UserType,
    args: {
      phone_number: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    resolve(_, args) {
      return AuthService.register(args);
    }
  },
  logout: {
    type: UserType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(_, args) {
      return AuthService.logout(args);
    }
  },
  login: {
    type: UserType,
    args: {
      phone_number: { type: GraphQLString },
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

module.exports = userMutations
