const graphql = require('graphql')
const { GraphQLString, GraphQLID, GraphQLBoolean } = graphql

const AskType = require('../types/ask_type')
const Ask = require('../../models/Ask')
const User = require('../../models/User')

const askMutations = {
  newAsk: {
    type: AskType,
    args: {
      author_id: { type: GraphQLID },
      name_used_id: { type: GraphQLID },
      question: { type: GraphQLString },
      use_date: { type: GraphQLBoolean },
      use_time: { type: GraphQLBoolean },
      date: { type: GraphQLString },
      deadline: { type: GraphQLString }
    },
    resolve: (parent, data, context) => {
      const ask = new Ask(data)

      return User.findById(data.author_id).then(user => {
        user.asks.push(ask)
        return Promise.all([ask.save(), user.save()]).then(([ask, user]) => {
          return ask
        })
      })
    }
  },
  deleteAsk: {
    type: AskType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => {
      return Ask.findById(id).then(ask => {
        User.findById(ask.owner_id).then(user => {
          user.asks.pull(ask)
          user.save()
        })
        return ask.remove()
      })
    }
  },
  updateAsk: {
    type: AskType,
    args: {
      id: { type: GraphQLID },
      name_used_id: { type: GraphQLID },
      question: { type: GraphQLString },
      use_date: { type: GraphQLBoolean },
      use_time: { type: GraphQLBoolean },
      date: { type: GraphQLString },
      deadline: { type: GraphQLString }
    },
    resolve: (_, data) => {
      return Ask.findById(data.id).then(ask => {
        ask.name_used_id = data.name_used_id || ask.name_used_id
        ask.question = data.question || ask.question
        ask.use_date = data.use_date || ask.use_date
        ask.use_time = data.use_time || ask.use_time
        ask.date = data.date || ask.date
        ask.deadline = data.deadline || ask.deadline
        return ask.save()
      })
    }
  }
}

module.exports = askMutations
