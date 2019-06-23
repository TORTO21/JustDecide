const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const GroupType = require('../types/group_type')
const Group = require('../../models/Group')
const User = require('../../models/User')

const groupMutation = new GraphQLObjectType({
  name: 'GroupMutation',
  fields: {
    newGroup: {
      type: GroupType,
      args: {
        owner_id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(_, { owner_id, name }) {
        // create
        const group = new Group({
          owner_id,
          name
        }).save()

        // add to list(s)
        const user = User.findByID(owner_id)
        user.groups.push(group)

        // return newly created
        return group
      }
    },
    deleteGroup: {
      type: GroupType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        // find it
        const group = Group.findById(id)

        // remove from list(s)
        const user = User.findById(group.owner_id)
        user.groups.pull(group)

        // remove
        return group.remove()
      }
    },
    updateGroup: {
      type: GroupType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString }
      },
      resolve(_, { id, name }) {
        return Group.findByIdAndUpdate(id, {
          name
        })
      }
    },
    addUserToGroup: {
      type: GroupType,
      args: {
        id: { type: GraphQLID },
        user_id: { type: GraphQLID }
      },
      resolve(_, { id, user_id }) {
        const group = Group.findById(id)
        group.members.push(user_id)

        const user = User.findById(user_id)
        user.groups.push(id)

        return group
      }
    },
    removeUserFromGroup: {
      type: GroupType,
      args: {
        id: { type: GraphQLID },
        user_id: { type: GraphQLID }
      },
      resolve(_, { id, user_id }) {
        const group = Group.findById(id)
        group.members.pull(user_id)

        const user = User.findById(user_id)
        user.groups.pull(id)

        return group
      }
    }
  }
})

module.exports = groupMutation
