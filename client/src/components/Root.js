import { ApolloProvider } from 'react-apollo'
import App from './App'
import { HashRouter } from 'react-router-dom'
import React from 'react'

const Root = ({ client }) => (
  <ApolloProvider client={client}>
    <HashRouter>
      <App />
    </HashRouter>
  </ApolloProvider>
)

export default Root
