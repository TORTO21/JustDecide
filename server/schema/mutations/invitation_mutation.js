const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const InvitationType = require('../types/invitation_type')
const Invitation = require('../../models/Invitation')
const User = require('../../models/User')
const Ask = require('../../models/Ask')

const invitationMutation = new GraphQLObjectType({
  name: 'InvitationMutation',
  fields: {
    newInvitation: {
      type: InvitationType,
      args: {
        ask_id: { type: GraphQLID },
        user_id: { type: GraphQLID },
        status: { type: GraphQLString },
        invite_url: { type: GraphQLString }
      },
      resolve(_, { ask_id, user_id, status, invite_url }) {
        // create
        const invitation = new Invitation({
          ask_id,
          user_id,
          status,
          invite_url
        }).save()

        // add to list(s)
        const user = User.findByID(user_id)
        user.invitations.push(invitation)

        const ask = Ask.findByID(ask_id)
        ask.invitations.push(invitation)

        // return newly created
        return invitation
      }
    },
    deleteInvitation: {
      type: InvitationType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        // find it
        const invitation = Invitation.findById(id)

        // remove from list(s)
        const user = User.findById(invitation.user_id)
        user.invitations.pull(invitation)

        const ask = Ask.findById(invitation.ask_id)
        ask.invitations.pull(invitation)

        // remove
        return invitation.remove()
      }
    },
    updateInvitation: {
      type: InvitationType,
      args: {
        id: { type: GraphQLID },
        status: { type: GraphQLString }
      },
      resolve(_, { id, status }) {
        return Invitation.findByIdAndUpdate(id, {
          status
        })
      }
    }
  }
})

module.exports = invitationMutation
