const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const VoteType = require('../types/vote_type')
const Vote = require('../../models/Vote')
const User = require('../../models/User')

const voteMutation = new GraphQLObjectType({
  name: 'VoteMutation',
  fields: {
    newVote: {
      type: VoteType,
      args: {
        option_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        direction: { type: GraphQLString }
      },
      resolve(_, { option_id, user_id, direction }) {
        // create
        const vote = new Vote({
          option_id,
          user_id,
          direction
        }).save()

        // add to list(s)
        const user = User.findByID(user_id)
        user.votes.push(vote)

        const option = Option.findByID(option_id)
        option.votes.push(vote)

        // return newly created
        return vote
      }
    },
    deleteVote: {
      type: VoteType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        // find it
        const vote = Vote.findById(id)

        // remove from list(s)
        const user = User.findById(vote.user_id)
        user.votes.pull(vote)

        const option = Option.findById(vote.option_id)
        option.votes.pull(vote)

        // remove
        return vote.remove()
      }
    },
    updateVote: {
      type: VoteType,
      args: {
        id: { type: GraphQLID },
        direction: { type: GraphQLString }
      },
      resolve(_, { id, direction }) {
        return Vote.findByIdAndUpdate(id, {
          direction
        })
      }
    }
  }
})

module.exports = voteMutation
