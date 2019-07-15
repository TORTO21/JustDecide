const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

const VoteType = require('../types/vote_type')
const Vote = require('../../models/Vote')
const Option = require('../../models/Option')
const Contact = require('../../models/Contact')
const User = require('../../models/User')
const { userLoggedIn } = require('../../services/auth')

const voteMutations = {
  newVote: {
    type: VoteType,
    args: {
      option_id: { type: GraphQLID },
      contact_id: { type: GraphQLID },
      direction: { type: GraphQLString }
    },
    resolve: async (parent, data, context) => {
      // if (!(await userLoggedIn(context))) {
      //   throw new Error('You must be logged in before proceeding')
      // }
      const vote = new Vote(data)
      return Option.findById(data.option_id).then(option => {
        option.votes.push(vote)
        return Contact.findById(data.contact_id).then(contact => {
          return User.findOne({ phone_number: contact.phone_number }).then(
            user => {
              if (user) {
                user.votes.push(vote)
                user.save()
              }
              return Promise.all([vote.save(), option.save()]).then(
                ([vote, option]) => {
                  return vote
                }
              )
            }
          )
        })
      })
    }
  },
  deleteVote: {
    type: VoteType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, { id }, context) => {
      // if (!(await userLoggedIn(context))) {
      //   throw new Error('You must be logged in before proceeding')
      // }
      return Vote.findById(id).then(vote => {
        return Contact.findById(vote.contact_id).then(contact => {
          return User.findOne({ phone_number: contact.phone_number }).then(
            user => {
              return Option.findById(vote.option_id).then(option => {
                if (user) {
                  user.votes.pull(vote)
                  user.save()
                }
                option.votes.pull(vote)
                vote.remove()
                return Promise.all([option.save(), vote.save()]).then(
                  ([option, vote]) => {
                    return vote
                  }
                )
              })
            }
          )
        })
      })
    }
  },
  updateVote: {
    type: VoteType,
    args: {
      id: { type: GraphQLID },
      direction: { type: GraphQLString }
    },
    resolve: async (_, data, context) => {
      // if (!(await userLoggedIn(context))) {
      //   throw new Error('You must be logged in before proceeding')
      // }
      return Vote.findById(data.id).then(vote => {
        vote.direction = data.direction || vote.direction
        return vote.save()
      })
    }
  }
}

module.exports = voteMutations
