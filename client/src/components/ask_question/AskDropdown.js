import React, { Component } from "react";
import { Query , ApolloConsumer } from "react-apollo";
import { GET_USER_CONTACTS } from '../../graphql/queries/ask_question_queries'

class AskDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
      displayName: "Ask as ...",
    }
  }



  referenceList(selfRefs) {
    return (
      <div>
        { selfRefs.map(ref => {
          return <div>{`${ref.name}`}</div>
        })}
      </div>
    )
  }

  toggleDropdown(){
    return this.setState({dropdown: true})
  }

  render() {
    return (
      <ApolloConsumer>
        { client => {
          
          return(
            <Query
              query={ GET_USER_CONTACTS }
              variables={ { id: "5d1155722ec86b307d6dfa98" } } 
            >

              { ({ loading, error, data }) => {
                if (loading) return "Loading..."
                if (error) return `Error! ${ error.message }`
                
                const { user } = data
                const currentUserId = client.cache.data.data.ROOT_QUERY.currentUserId
                // console.log(currentUserId)
                
                const selfRefs = user.contacts.filter(contact => {
                  return contact.user.id === user.id
                }).map(contact => {
                  return {
                    ref: contact.name,
                    id: contact.user.id
                  }
                })

                return (
                  <div
                    className="ask-question-as drop-shadow"
                    onClick={this.openDropdown}
                  >
                    { console.log(selfRefs) }
                    <span>{ this.state.displayName }</span>
                    <span className="ask-question-as-icon">
                      <svg width="22" height="22" viewBox="0 -5 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="24 / music / player-play">
                          <path id="icon" fillRule="evenodd" clipRule="evenodd" d="M43.75 10.4167L6.25002 10.4167C4.60176 10.4167 3.60626 12.2401 4.49757 13.6266L23.2476 42.7933C24.0676 44.0689 25.9324 44.0689 26.7525 42.7933L45.5025 13.6266C46.3938 12.2401 45.3983 10.4167 43.75 10.4167ZM25 37.8141L10.066 14.5834L39.934 14.5834L25 37.8141Z" fill="#979797"/>
                        </g>
                      </svg>
                    </span>
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
