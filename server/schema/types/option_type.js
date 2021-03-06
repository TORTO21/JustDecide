const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

const Contact = require('../../models/Contact')
const Ask = require('../../models/Ask')
const Vote = require('../../models/Vote')

const OptionType = new GraphQLObjectType({
  name: 'OptionType',
  fields: () => ({
    id: { type: GraphQLID },

    creator: {
      type: require('../types/contact_type'),
      resolve: option => Contact.findById(option.creator_id)
    },

    ask: {
      type: require('../types/ask_type'),
      resolve: option => Ask.findById(option.ask_id)
    },

    votes: {
      type: new GraphQLList(require('../types/vote_type')),
      resolve: option => Vote.find({ _id: { $in: option.votes } })
    },

    title: { type: GraphQLString }
  })
})

module.exports = OptionType
