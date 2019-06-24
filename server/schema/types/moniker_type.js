const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const User = require('../../models/User')

const MonikerType = new GraphQLObjectType({
  name: 'MonikerType',
  fields: () => ({
    id: { type: GraphQLID },

    owner: {
      type: require('./user_type'),
      resolve: moniker => User.findById(moniker.owner_id)
    },

    name: { type: GraphQLString }
  })
})

module.exports = MonikerType
