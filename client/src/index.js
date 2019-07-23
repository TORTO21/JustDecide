import './index.css'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Mutations from './graphql/mutations/auth_mutations'
import AuthQueries from './graphql/queries/auth_queries'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import Errors from './components/errors/Errors'
import { createHttpLink } from 'apollo-link-http'
import { onError } from "apollo-link-error";

const { VERIFY_USER } = Mutations
const { CURRENT_USER_ID } = AuthQueries

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
    currentUserId: {__typename: "currentUserId", id: currentUserId}
  }
})

// create uri value for httpLink basd on production mode
const graphQLRoute = process.env.NODE_ENV === 'production'
? '/graphql'
: 'http://localhost:5000/graphql'

// Link to access backend with token from local storage,
// passed into header of each request
const httpLink = createHttpLink({
  uri: graphQLRoute,
  headers: {
    authorization: localStorage.getItem('auth-token')
  }
})

const errorLink = onError(error => console.log("hello from error index"))

// Create new Apollo client from link and cache.
const client = new ApolloClient({
  link: httpLink,
  cache,
  onError: errorLink,
  resolvers: {
    Query: {
      currentUserId: (parent, args, { getCacheKey }) => {
        return getCacheKey({__typename: "currentUserId"})
        
        // const anyShit = cache.readQuery({ CURRENT_USER_ID })
        // console.log(anyShit)

        return null
      }
    }
  }
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
          currentUserId: {__typename: "currentUserId", id: data.verifyUser.id}
          // currentUserId: data.verifyUser.id
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
