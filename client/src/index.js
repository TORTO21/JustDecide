import './index.css'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Mutations from './graphql/mutations/auth_mutations'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import Errors from './components/errors/Errors'
import { createHttpLink } from 'apollo-link-http'
import { onError } from "apollo-link-error";

const { VERIFY_USER } = Mutations

// declare new cache and normalize the data by object id
const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
})

// look for token and currentUserId in local storage and
// SET isLoggedIn and currentUserId based on result in cache
const token = localStorage.getItem('auth-token')
const currentUserId = localStorage.getItem('current-user')
cache.writeData({
  data: {
    askQuestion: '',
    askUseDate: true,
    // askAskingAs: null,
    askAskingAsId: '',
    askAskingAsName: '',
    askDate: '',
    askDeadline: '',
    askOptions: JSON.stringify([]),
    askInvitees: [],
    errors: [],
    isLoggedIn: Boolean(token),
    currentUserId
  }
})

// Link to access backend with token from local storage,
// passed into header of each request
if (process.env.NODE_ENV === 'production') {

} else {
}

const httpLink = createHttpLink({
  // uri: 'http://localhost:5000/graphql',
  uri: '/graphql',
  headers: {
    authorization: localStorage.getItem('auth-token')
  }
})

const errorLink = onError(error => console.log("hello from error index"))
// (({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

// Create new Apollo client from link and cache.
const client = new ApolloClient({
  link: httpLink,
  cache,
  onError: 
  errorLink
  // ({ networkError, graphQLErrors }) => {
  //   console.log('graphQLErrors', graphQLErrors)
  //   console.log('networkError', networkError)
  //   ReactDOM.render(
  //     <Errors
  //       client={ client }
  //       networkError={ networkError }
  //       graphQLErrors={ graphQLErrors }
  //       />, document.getElementById('root'))
  // }
})

// if token exists in local stroage, apply backend mutation,
// VERIFY_USER, to match with back-end token, thus setting
// isLoggedIn and currentUserId status.
if (token) {
  client
    .mutate({
      mutation: VERIFY_USER,
      variables: { token }
    })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
          currentUserId: data.verifyUser.id
        }
      })
    })
} else {
  // otherwise isLoggedIn and currentUserId defaults to false and e
  cache.writeData({
    data: {
      isLoggedIn: false,
      currentUserId: ''
    }
  })
}

ReactDOM.render(<Root client={client} />, document.getElementById('root'))
