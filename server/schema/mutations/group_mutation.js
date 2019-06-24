const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

const GroupType = require('../types/group_type')
const Group = require('../../models/Group')
const User = require('../../models/User')

const groupMutations = {
  newGroup: {
    type: GroupType,
    args: {
      owner_id: { type: GraphQLID },
      name: { type: GraphQLString }
    },
    resolve: (parent, data, context) => {
      const group = new Group(data)
      return User.findById(data.owner_id).then(user => {
        user.groups.push(group)
        return Promise.all([group.save(), user.save()]).then(
          ([group, user]) => {
            return group
          }
        )
      })
    }
  },
  deleteGroup: {
    type: GroupType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => {
      return Group.findById(id).then(group => {
        User.findById(group.owner_id).then(user => {
          user.groups.pull(group)
          user.save()
        })
        return group.remove()
      })
    }
  },
  updateGroup: {
    type: GroupType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString }
    },
    resolve: (_, data) => {
      return Group.findById(data.id).then(group => {
        group.name = data.name || group.name
        return group.save()
      })
    }
  },
  addUserToGroup: {
    type: GroupType,
    args: {
      id: { type: GraphQLID },
      user_id: { type: GraphQLID }
    },
    resolve: (parent, data, context) => {
      return Group.findById(data.id).then(group => {
        return User.findById(data.user_id).then(user => {
          group.members.push(user)
          user.memberships.push(group)
          return Promise.all([group.save(), user.save()]).then(
            ([group, user]) => {
              return group
            }
          )
        })
      })
    }
  },
  removeUserFromGroup: {
    type: GroupType,
    args: {
      id: { type: GraphQLID },
      user_id: { type: GraphQLID }
    },
    resolve: (parent, data, context) => {
      return Group.findById(data.id).then(group => {
        return User.findById(data.user_id).then(user => {
          group.members.pull(user)
          user.memberships.pull(group)
          return Promise.all([group.save(), user.save()]).then(
            ([group, user]) => {
              return group
            }
          )
        })
      })
    }
  }
}

module.exports = groupMutations
