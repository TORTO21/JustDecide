import { ApolloProvider } from 'react-apollo'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

const Root = ({ client }) => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)

export default Root
