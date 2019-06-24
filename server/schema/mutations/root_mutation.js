const _ = require('lodash')
const graphql = require('graphql')
const { GraphQLObjectType } = graphql

const { merge } = _

const ask = require('./ask_mutation')
const contact = require('./contact_mutation')
const group = require('./group_mutation')
const invitation = require('./invitation_mutation')
const user = require('./user_mutation')
const vote = require('./vote_mutation')
const moniker = require('./moniker_mutation')
const option = require('./option_mutation')

const fields = merge(
  ask,
  contact,
  group,
  invitation,
  user,
  vote,
  moniker,
  option
)

const allMutations = new GraphQLObjectType({
  name: 'Mutation',
  fields
})

module.exports = allMutations
