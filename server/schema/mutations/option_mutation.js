const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const OptionType = require('../types/option_type')
const Option = require('../../models/Option')
const User = require('../../models/User')
const Ask = require('../../models/Ask')

const optionMutation = new GraphQLObjectType({
  name: 'OptionMutation',
  fields: {
    newOption: {
      type: OptionType,
      args: {
        creator_id: { type: GraphQLID },
        ask_id: { type: GraphQLID },
        title: { type: GraphQLString }
      },
      resolve(_, { creator_id, ask_id, title }) {
        // create
        const option = new Option({
          creator_id,
          ask_id,
          title
        }).save()

        // add to list(s)
        const user = User.findByID(creator_id)
        user.options.push(option)

        const ask = Ask.findByID(ask_id)
        ask.options.push(option)

        // return newly created
        return option
      }
    },
    deleteOption: {
      type: OptionType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        // find it
        const option = Option.findById(id)

        // remove from list(s)
        const user = User.findById(option.creator_id)
        user.options.pull(option)

        const ask = Ask.findById(option.ask_id)
        ask.options.pull(option)

        // remove
        return option.remove()
      }
    },
    updateOption: {
      type: OptionType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString }
      },
      resolve(_, { id, title }) {
        return Option.findByIdAndUpdate(id, {
          title
        })
      }
    }
  }
})

module.exports = optionMutation
