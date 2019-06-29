import { ApolloConsumer, Query } from 'react-apollo'
import React, { Component } from 'react'

import { GET_USER_CONTACTS } from '../../graphql/queries/ask_question_queries'

class AskDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
      selfRef: "Asking as ...",
    }
    this.referenceList = this.referenceList.bind(this)
    this.selectRef = this.selectRef.bind(this)
  }

  referenceList(selfRefs, client) {
    if (this.state.dropdown) {
      return (
        <div className="ask-question-dropdown drop-shadow">
          { selfRefs.map((selfRef, i) => {
            return (
              <div
                key={i}
                className="ask-question-ref" 
                onClick={ () => this.selectRef(selfRef, client) }
              >
                { selfRef }
              </div>
            )
          })}
        </div>
      )
    } else {
      return null
    }
  }

  openDropdown() {
    this.setState({dropdown: true})
  }

  selectRef(selfRef, client) {
    this.setState({
      selfRef,
      dropdown: false
    })
    client.writeData({
      data: { selfRef }
    })
  }

  render() {
    return (
      <ApolloConsumer>
        { client => {
          console.log(client.cache.data.data.ROOT_QUERY)
          const currentUserId = client.cache.data.data.ROOT_QUERY.currentUserId
          return(
            <Query
              query={ GET_USER_CONTACTS }
              variables={ { id: currentUserId } } 
            >
              { ({ loading, error, data: { user } }) => {
                if (loading) return "Asking as ..."
                // if (error) return console.log(error.message)
                
                const selfRefs = user.contacts.filter(contact => {
                  return contact.user && contact.user.id === user.id
                }).map(contact => contact.name)

                return ( 
                  <div>
                    <div
                      onClick={ () => this.openDropdown() }
                      className="ask-question-selfref"  
                    >
                      { this.state.selfRef }
                    </div>
                    { this.referenceList(selfRefs, client) }
                  </div>
                )
              }}
            </Query>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default AskDropdown
