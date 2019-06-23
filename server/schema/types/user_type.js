const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

const Ask = require('../../models/Ask')
const Invitation = require('../../models/Invitation')
const User = require('../../models/User')
const Group = require('../../models/Group')
const Vote = require('../../models/Vote')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },

    phone_hash: { type: GraphQLString },

    status: { type: GraphQLString },

    asks: {
      type: new GraphQLList(require('../types/ask_type')),
      resolve: user => Ask.find({ id: { $in: user.asks } })
    },

    invitations: {
      type: new GraphQLList(require('../types/invitation_type')),
      resolve: user => Invitation.find({ id: { $in: user.invitations } })
    },

    contacts: {
      type: new GraphQLList(UserType),
      resolve: user => User.find({ id: { $in: user.contacts } })
    },

    groups: {
      type: new GraphQLList(require('../types/group_type')),
      resolve: user => Group.find({ id: { $in: user.groups } })
    },

    votes: {
      type: new GraphQLList(require('../types/vote_type')),
      resolve: user => Vote.find({ id: { $in: user.votes } })
    },

    options: {
      type: new GraphQLList(require('../types/option_type')),
      resolve: user => Option.find({ id: { $in: user.options } })
    }
  })
})

module.exports = UserType
