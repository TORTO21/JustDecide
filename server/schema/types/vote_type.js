const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const Contact = require('../../models/Contact')
const Option = require('../../models/Option')

const VoteType = new GraphQLObjectType({
  name: 'VoteType',
  fields: () => ({
    id: { type: GraphQLID },

    option: {
      type: require('../types/option_type'),
      resolve: vote => Option.findById(vote.option_id)
    },

    contact: {
      type: require('../types/contact_type'),
      resolve: vote => Contact.findById(vote.contact_id)
    },

    direction: { type: GraphQLString }
  })
})

module.exports = VoteType
