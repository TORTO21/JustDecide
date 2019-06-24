const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

const VoteType = require('../types/vote_type')
const Vote = require('../../models/Vote')
const Option = require('../../models/Option')
const Contact = require('../../models/Contact')
const User = require('../../models/User')

const voteMutations = {
  newVote: {
    type: VoteType,
    args: {
      option_id: { type: GraphQLID },
      contact_id: { type: GraphQLID },
      direction: { type: GraphQLString }
    },
    resolve: (parent, data, context) => {
      const vote = new Vote(data)
      return Option.findById(data.option_id).then(option => {
        option.votes.push(vote)
        return Contact.findById(data.contact_id).then(contact => {
          return User.findById(contact.user_id).then(user => {
            user.votes.push(vote)
            return Promise.all([vote.save(), option.save(), user.save()]).then(
              ([vote, option, user]) => {
                return vote
              }
            )
          })
        })
      })
    }
  },
  deleteVote: {
    type: VoteType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => {
      return Vote.findById(id).then(vote => {
        return Contact.findById(vote.contact_id).then(contact => {
          return User.findById(contact.user_id).then(user => {
            return Option.findById(vote.option_id).then(option => {
              user.votes.pull(vote)
              option.votes.pull(vote)
              vote.remove()
              return Promise.all([
                user.save(),
                option.save(),
                vote.save()
              ]).then(([user, option, vote]) => {
                return vote
              })
            })
          })
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
    resolve: (_, data) => {
      return Vote.findById(data.id).then(vote => {
        vote.direction = data.direction || vote.direction
        return vote.save()
      })
    }
  }
}

module.exports = voteMutations
