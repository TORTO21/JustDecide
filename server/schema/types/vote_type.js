const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const User = require('../../models/User')
const Option = require('../../models/Option')

const VoteType = new GraphQLObjectType({
  name: 'VoteType',
  fields: () => ({
    id: { type: GraphQLID },

    option: {
      type: require('../types/option_type'),
      resolve: vote => Option.findById(vote.option_id)
    },

    user: {
      type: require('../types/user_type'),
      resolve: vote => User.findById(vote.user_id)
    },

    direction: { type: GraphQLString }
  })
})

module.exports = VoteType
