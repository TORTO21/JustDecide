const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

const InvitationType = require('../types/invitation_type')
const Invitation = require('../../models/Invitation')
const User = require('../../models/User')
const Ask = require('../../models/Ask')

const invitationMutations = {
  newInvitation: {
    type: InvitationType,
    args: {
      ask_id: { type: GraphQLID },
      user_id: { type: GraphQLID },
      status: { type: GraphQLString },
      invite_url: { type: GraphQLString }
    },
    resolve: (parent, data, context) => {
      const invitation = new Invitation(data)
      return Ask.findById(data.ask_id).then(ask => {
        ask.invitations.push(invitation)
        return User.findById(data.user_id).then(user => {
          user.invitations.push(invitation)
          return Promise.all([invitation.save(), ask.save(), user.save()]).then(
            ([invitation, ask, user]) => {
              return invitation
            }
          )
        })
      })
    }
  },
  deleteInvitation: {
    type: InvitationType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => {
      return Invitation.findById(id).then(invitation => {
        return Ask.findById(invitation.ask_id).then(ask => {
          return User.findById(invitation.user_id).then(user => {
            ask.invitations.pull(invitation)
            user.invitations.pull(invitation)
            invitation.remove()
            return Promise.all([
              ask.save(),
              user.save(),
              invitation.save()
            ]).then(([ask, user, invitation]) => {
              return invitation
            })
          })
        })
      })
    }
  },
  updateInvitation: {
    type: InvitationType,
    args: {
      id: { type: GraphQLID },
      status: { type: GraphQLString }
    },
    resolve: (_, data) => {
      return Invitation.findById(data.id).then(invitation => {
        invitation.status = data.status || invitation.status
        return invitation.save()
      })
    }
  }
}

module.exports = invitationMutations
