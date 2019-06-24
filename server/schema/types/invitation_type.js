const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const User = require('../../models/User')
const Ask = require('../../models/Ask')

const InvitationType = new GraphQLObjectType({
  name: 'InvitationType',
  fields: () => ({
    id: { type: GraphQLID },

    ask: {
      type: require('../types/ask_type'),
      resolve: invitation => Ask.findById(invitation.ask_id)
    },

    user: {
      type: require('../types/user_type'),
      resolve: invitation => User.findById(invitation.user_id)
    },

    status: { type: GraphQLString },

    invite_url: { type: GraphQLString }
  })
})

module.exports = InvitationType
