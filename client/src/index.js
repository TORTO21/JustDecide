import './index.css'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Mutations from './graphql/mutations/auth_mutations'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import { createHttpLink } from 'apollo-link-http'

const { VERIFY_USER } = Mutations

// declare new cache and normalize the data by object id
const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
})

// look for token in local storage and set isLoggedIn based on result in cache
const token = localStorage.getItem('auth-token')
cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    currentUserId: true,
    askOptions: [],
    askInvitees: []
  }
})

// Link to access backend with token from local storage,
// passed into header of each request
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: localStorage.getItem('auth-token')
  }
})

// Create new Apollo client from link and cache.
const client = new ApolloClient({
  link: httpLink,
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

// if token exists in local stroage, apply backend mutation, VERIFY_USER,
// to see if it matches with back-end token, thus setting isLoggedIn status.
if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
          currentUserId: data.verifyUser.id
        }
      })
    })
} else {
  // otherwise isLoggedIn defaults to false
  cache.writeData({
    data: {
      isLoggedIn: false
    }
  })
}

ReactDOM.render(<Root client={client} />, document.getElementById('root'))
