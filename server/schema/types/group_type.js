const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

const User = require('../../models/User')

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: () => ({
    id: { type: GraphQLID },

    owner: {
      type: require('../types/user_type'),
      resolve: group => User.findById(group.owner_id)
    },

    members: {
      type: new GraphQLList(require('../types/user_type')),
      resolve: group => User.find({ id: { $in: group.members } })
    },

    name: { type: GraphQLString }
  })
})

module.exports = GroupType
