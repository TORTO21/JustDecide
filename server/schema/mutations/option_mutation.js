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
      if (!(await userLoggedIn(context))) {
        throw new Error('You must be logged in before proceeding')
      }

      const option = new Option(data)
      return Contact.findById(data.creator_id).then(contact => {
        return User.findOne({ phone_number: contact.phone_number }).then(
          user => {
            if (user) {
              user.options.push(option)
              user.save()
            }
            return Ask.findById(data.ask_id).then(ask => {
              ask.options.push(option)
              return Promise.all([option.save(), ask.save()]).then(
                ([option, ask]) => {
                  return option
                }
              )
            })
          }
        )
      })
    }
  },
  deleteOption: {
    type: OptionType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, { id }, context) => {
      if (!(await userLoggedIn(context))) {
        throw new Error('You must be logged in before proceeding')
      }
      return Option.findById(id).then(option => {
        return Ask.findById(option.ask_id).then(ask => {
          return Contact.findById(option.creator_id).then(contact => {
            return User.findOne({ phone_number: contact.phone_number }).then(
              user => {
                if (user) {
                  user.options.pull(option)
                  user.save()
                }
                ask.options.pull(option)
                option.remove()
                return Promise.all([ask.save(), option.save()]).then(
                  ([ask, option]) => {
                    return option
                  }
                )
              }
            )
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
      if (!(await userLoggedIn(context))) {
        throw new Error('You must be logged in before proceeding')
      }
      return Option.findById(data.id).then(option => {
        option.title = data.title || option.title
        return option.save()
      })
    }
  }
}

module.exports = optionMutations
