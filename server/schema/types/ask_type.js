const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList
} = graphql

const User = require('../../models/User')
const Moniker = require('../../models/Moniker')
const Invitation = require('../../models/Invitation')
const Option = require('../../models/Option')

const AskType = new GraphQLObjectType({
  name: 'AskType',
  fields: () => ({
    id: { type: GraphQLID },

    author: {
      type: require('../types/user_type'),
      resolve: ask => User.findById(ask.author_id)
    },

    moniker: {
      type: require('../types/moniker_type'),
      resolve: ask => Moniker.findById(ask.moniker_id)
    },

    question: { type: GraphQLString },

    use_date: { type: GraphQLBoolean },

    use_time: { type: GraphQLBoolean },

    date: { type: GraphQLFloat },

    deadline: { type: GraphQLFloat },

    invitations: {
      type: new GraphQLList(require('../types/invitation_type')),
      resolve: ask => Invitation.find({ ask_id: ask.id })
    },

    options: {
      type: new GraphQLList(require('../types/option_type')),
      resolve: ask => Option.find({ ask_id: ask.id })
    }
  })
})

module.exports = AskType
