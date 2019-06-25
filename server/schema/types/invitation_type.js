const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const Contact = require('../../models/Contact')
const Ask = require('../../models/Ask')

const InvitationType = new GraphQLObjectType({
  name: 'InvitationType',
  fields: () => ({
    id: { type: GraphQLID },

    ask: {
      type: require('../types/ask_type'),
      resolve: invitation => Ask.findById(invitation.ask_id)
    },

    contact: {
      type: require('../types/contact_type'),
      resolve: invitation => Contact.findById(invitation.contact_id)
    },

    status: { type: GraphQLString },

    invite_url: { type: GraphQLString }
  })
})

module.exports = InvitationType
