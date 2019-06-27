const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

const OptionType = require('../types/option_type')
const Option = require('../../models/Option')
const Contact = require('../../models/Contact')
const Ask = require('../../models/Ask')
const User = require('../../models/User')
const { userLoggedIn } = require('../../services/auth')

const optionMutations = {
  newOption: {
    type: OptionType,
    args: {
      creator_id: { type: GraphQLID },
      ask_id: { type: GraphQLID },
      title: { type: GraphQLString }
    },
    resolve: async (parent, data, context) => {
      if (!await userLoggedIn(context)) {
        throw new Error("You must be logged in before proceeding")
      }
      const option = new Option(data)
      return Contact.findById(data.creator_id).then(contact => {
        return User.findById(contact.user_id).then(user => {
          user.options.push(option)
          return Ask.findById(data.ask_id).then(ask => {
            ask.options.push(option)
            return Promise.all([option.save(), user.save(), ask.save()]).then(
              ([option, user, ask]) => {
                return option
              }
            )
          })
        })
      })
    }
  },
  deleteOption: {
    type: OptionType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, { id }, context) => {
      if (!await userLoggedIn(context)) {
        throw new Error("You must be logged in before proceeding")
      }
      return Option.findById(id).then(option => {
        return Ask.findById(option.ask_id).then(ask => {
          return Contact.findById(option.creator_id).then(contact => {
            return User.findById(contact.user_id).then(user => {
              ask.options.pull(option)
              user.options.pull(option)
              option.remove()
              return Promise.all([ask.save(), user.save(), option.save()]).then(
                ([ask, user, option]) => {
                  return option
                }
              )
            })
          })
        })
      })
    }
  },
  updateOption: {
    type: OptionType,
    args: {
      id: { type: GraphQLID },
      title: { type: GraphQLString }
    },
    resolve: async (_, data, context) => {
      if (!await userLoggedIn(context)) {
        throw new Error("You must be logged in before proceeding")
      }
      return Option.findById(data.id).then(option => {
        option.title = data.title || option.title
        return option.save()
      })
    }
  }
}

module.exports = optionMutations
