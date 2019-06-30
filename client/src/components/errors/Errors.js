import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import './Errors.css'

class Errors extends Component {
  
  render() {
    
    return (
      <ApolloConsumer>
        { client => {
          const { errors } = client.cache.data.data.ROOT_QUERY
          console.log(this.props)
          const errorsList = errors.length > 0
            ? errors.map(error => <div>{ error }</div>)
            : null

          return (
            <div
              className="errors box-shadow" >
              hello
              { errorsList }
            </div>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default Errors