const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

const InvitationType = require('../types/invitation_type')
const Invitation = require('../../models/Invitation')
const User = require('../../models/User')
const Ask = require('../../models/Ask')
const Contact = require('../../models/Contact')
const { userLoggedIn } = require('../../services/auth')

const invitationMutations = {
  newInvitation: {
    type: InvitationType,
    args: {
      ask_id: { type: GraphQLID },
      contact_id: { type: GraphQLID },
      status: { type: GraphQLString },
      invite_url: { type: GraphQLString }
    },
    resolve: async (parent, data, context) => {
      if (!await userLoggedIn(context)) {
        throw new Error("You must be logged in before proceeding")
      }
      const invitation = new Invitation(data)
      return Ask.findById(data.ask_id).then(ask => {
        ask.invitations.push(invitation)
        return Contact.findById(data.contact_id).then(contact => {
          return User.findById(contact.user_id).then(user => {
            user.invitations.push(invitation)
            return Promise.all([
              invitation.save(),
              ask.save(),
              user.save()
            ]).then(([invitation, ask, user]) => {
              return invitation
            })
          })
        })
      })
    }
  },
  deleteInvitation: {
    type: InvitationType,
    args: { id: { type: GraphQLID } },
    resolve: async (_, { id }, context) => {
      // if (!await userLoggedIn(context)) {
      //   throw new Error("You must be logged in before proceeding")
      // }
      return Invitation.findById(id).then(invitation => {
        return Ask.findById(invitation.ask_id).then(ask => {
          return Contact.findById(invitation.contact_id).then(contact => {
            return User.findById(contact.user_id).then(user => {
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
      })
    }
  },
  updateInvitation: {
    type: InvitationType,
    args: {
      id: { type: GraphQLID },
      status: { type: GraphQLString }
    },
    resolve: async (_, data, context) => {
      if (!await userLoggedIn(context)) {
        throw new Error("You must be logged in before proceeding")
      }
      return Invitation.findById(data.id).then(invitation => {
        invitation.status = data.status || invitation.status
        return invitation.save()
      })
    }
  }
}

module.exports = invitationMutations
