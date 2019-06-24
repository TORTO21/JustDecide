const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql

// const { AWSKey } = require('../../../config/keys');
const axios = require('axios')

const AskType = require('./ask_type')
const Ask = require('../../models/Ask')
const ContactType = require('./contact_type')
const Contact = require('../../models/Contact')
const GroupType = require('./group_type')
const Group = require('../../models/Group')
const InvitationType = require('./invitation_type')
const Invitation = require('../../models/Invitation')
const OptionType = require('./option_type')
const Option = require('../../models/Option')
const UserType = require('./user_type')
const User = require('../../models/User')
const VoteType = require('./vote_type')
const Vote = require('../../models/Vote')

// const authOptions = {
//   method: "GET",
//   url:
//     "https://hcu221eec0.execute-api.us-west-1.amazonaws.com/default/generate-price",
//   headers: {
//     "x-api-key": AWSKey
//   }
// };

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    asks: {
      type: new GraphQLList(AskType),
      resolve() {
        return Ask.find({})
      }
    },
    ask: {
      type: AskType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Ask.findById(args.id)
      }
    },
    groups: {
      type: new GraphQLList(GroupType),
      resolve() {
        return Group.find({})
      }
    },
    group: {
      type: GroupType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Group.findById(args.id)
      }
    },
    invitations: {
      type: new GraphQLList(InvitationType),
      resolve() {
        return Invitation.find({})
      }
    },
    invitation: {
      type: InvitationType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Invitation.findById(args.id)
      }
    },
    options: {
      type: new GraphQLList(OptionType),
      resolve() {
        return Option.find({})
      }
    },
    option: {
      type: OptionType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Option.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({})
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args.id)
      }
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve() {
        return Vote.find({})
      }
    },
    vote: {
      type: VoteType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Vote.findById(args.id)
      }
    },
    contacts: {
      type: new GraphQLList(ContactType),
      resolve() {
        return Contact.find({})
      }
    },
    contact: {
      type: ContactType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Contact.findById(args.id)
      }
    }
  })
})

module.exports = RootQueryType
