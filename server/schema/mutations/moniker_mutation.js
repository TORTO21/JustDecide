const graphql = require('graphql')
const { GraphQLString, GraphQLID } = graphql

const User = require('../../models/User')
const MonikerType = require('../types/moniker_type')
const Moniker = require('../../models/Moniker')

const monikerMutations = {
  newMoniker: {
    type: MonikerType,
    args: {
      owner_id: { type: GraphQLID },
      name: { type: GraphQLString }
    },
    resolve: (parent, data, context) => {
      const moniker = new Moniker(data)
      return User.findById(data.owner_id).then(user => {
        user.monikers.push(moniker)
        return Promise.all([moniker.save(), user.save()]).then(
          ([moniker, user]) => {
            return moniker
          }
        )
      })
    }
  },
  deleteMoniker: {
    type: MonikerType,
    args: { id: { type: GraphQLID } },
    resolve: (_, { id }) => {
      return Moniker.findById(id).then(moniker => {
        User.findById(moniker.owner_id).then(user => {
          user.monikers.pull(moniker)
          user.save()
        })
        return moniker.remove()
      })
    }
  },
  updateMoniker: {
    type: MonikerType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString }
    },
    resolve: (_, { id, name }) => {
      return Moniker.findById(id).then(moniker => {
        moniker.name = name
        return moniker.save()
      })
    }
  }
}

module.exports = monikerMutations
