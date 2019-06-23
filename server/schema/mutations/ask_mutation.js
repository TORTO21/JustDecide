const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt
} = graphql

const AskType = require('../types/ask_type')
const Ask = require('../../models/Ask')
const User = require('../../models/User')

const askMutation = new GraphQLObjectType({
  name: 'AskMutation',
  fields: {
    newAsk: {
      type: AskType,
      args: {
        author_id: { type: GraphQLID },
        question: { type: GraphQLString },
        use_date: { type: GraphQLBoolean },
        use_time: { type: GraphQLBoolean },
        date: { type: GraphQLInt },
        deadline: { type: GraphQLInt }
      },
      resolve(_, { author_id, question, use_date, use_time, date, deadline }) {
        // create
        const ask = new Ask({
          author_id,
          question,
          use_date,
          use_time,
          date,
          deadline
        }).save()

        // add to list(s)
        const user = User.findByID(author_id)
        user.asks.push(ask)

        // return newly created
        return ask
      }
    },
    deleteAsk: {
      type: AskType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        // find it
        const ask = Ask.findById(id)

        // remove from list(s)
        const user = User.findById(ask.owner_id)
        user.asks.pull(ask)

        // remove
        return ask.remove()
      }
    },
    updateAsk: {
      type: AskType,
      args: {
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        use_date: { type: GraphQLBoolean },
        use_time: { type: GraphQLBoolean },
        date: { type: GraphQLInt },
        deadline: { type: GraphQLInt }
      },
      resolve(_, { id, question, use_date, use_time, date, deadline }) {
        return Ask.findByIdAndUpdate(id, {
          question,
          use_date,
          use_time,
          date,
          deadline
        })
      }
    }
  }
})

module.exports = askMutation
