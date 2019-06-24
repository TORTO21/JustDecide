const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

const Ask = require('../../models/Ask')
const Invitation = require('../../models/Invitation')
const Group = require('../../models/Group')
const Vote = require('../../models/Vote')
const Option = require('../../models/Option')
const Contact = require('../../models/Contact')

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },

    phone_hash: { type: GraphQLString },

    status: { type: GraphQLString },

    asks: {
      type: new GraphQLList(require('../types/ask_type')),
      resolve: user => Ask.find({ author_id: user.id })
    },

    invitations: {
      type: new GraphQLList(require('../types/invitation_type')),
      resolve: user => Invitation.find({ user_id: user.id })
    },

    groups: {
      type: new GraphQLList(require('../types/group_type')),
      resolve: user => Group.find({ owner_id: user.id })
    },

    memberships: {
      type: new GraphQLList(require('../types/group_type')),
      resolve: user => Group.find({ _id: { $in: user.memberships } })
    },

    votes: {
      type: new GraphQLList(require('../types/vote_type')),
      resolve: user => Vote.find({ user_id: user.id })
    },

    options: {
      type: new GraphQLList(require('../types/option_type')),
      resolve: user => Option.find({ creator_id: user.id })
    },

    contacts: {
      type: new GraphQLList(require('./contact_type')),
      resolve: user => Contact.find({ owner_id: user.id })
    }
  })
})

module.exports = UserType
