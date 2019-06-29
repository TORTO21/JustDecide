const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const User = require('../../models/User')

const ContactType = new GraphQLObjectType({
  name: 'ContactType',
  fields: () => ({
    id: { type: GraphQLID },

    owner: {
      type: require('../types/user_type'),
      resolve: contact => User.findById(contact.owner_id)
    },

    user: {
      type: require('../types/user_type'),
      resolve: contact => User.findById(contact.user_id)
    },

    name: { type: GraphQLString },

    phone_number: { type: GraphQLString }
  })
})

module.exports = ContactType
