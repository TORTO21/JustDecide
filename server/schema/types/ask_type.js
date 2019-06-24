const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql

const User = require('../../models/User')
const Contact = require('../../models/Contact')
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

    name_used: {
      type: require('../types/contact_type'),
      resolve: ask => Contact.findById(ask.name_used_id)
    },

    question: { type: GraphQLString },

    use_date: { type: GraphQLBoolean },

    use_time: { type: GraphQLBoolean },

    date: { type: GraphQLString },

    deadline: { type: GraphQLString },

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
