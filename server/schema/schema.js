const graphql = require('graphql')
const { GraphQLSchema } = graphql
const mutation = require('./mutations/root_mutation')
const query = require('./types/root_query_type')

module.exports = new GraphQLSchema({
  query,
  mutation
})
