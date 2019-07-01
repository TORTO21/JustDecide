import { ApolloConsumer, Query, Mutation } from 'react-apollo'
import React, { Component } from 'react'
import { GET_USER_CONTACTS } from '../../graphql/queries/ask_question_queries'
import { NEW_CONTACT } from '../../graphql/mutations/contact_mutations'

class AskDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
      selfRef: this.props.currentSelection,
      newRef: {}
    }
    this.referenceList = this.referenceList.bind(this)
    this.selectRef = this.selectRef.bind(this)
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  referenceList(selfRefs, client, user) {
    // console.log(user)
    if (this.state.dropdown) {
      return (
        <div className="ask-question-dropdown drop-shadow">
          <Mutation
            mutation={ NEW_CONTACT }
          >
            { (newContact, { data }) => {
              return (
                <form
                  onSubmit={ e => {
                    // console.log(user)
                    e.preventDefault()
                    newContact({
                      variables: {
                        phone_number: user.phone_number,
                        owner_id: user.id,
                        name: this.state.newRef
                      }
                    })
                    .then(({ data: { newContact } }) => {
                      // console.log(newContact)
                      this.selectRef(newContact, client)
                    })
                  }
                }>
                  <input
                    className="ask-question-ref-new"
                    placeholder="Something else... (ex. 'Dad')"
                    onChange={ this.update("newRef") }
                  >
                  </input>
                </form>
              )
            }}
          </Mutation>
          {selfRefs.map((selfRef, i) => {
            return (
              <div
                key={i}
                className="ask-question-ref"
                onClick={() => this.selectRef(selfRef, client)}
              >
                {selfRef.name}
              </div>
            )
          })}
        </div>
      )
    } else {
      return null
    }
  }



  closeDropdown() {
    this.setState({ dropdown: false })
  }
  
  openDropdown() {
    this.setState({ dropdown: true })
  }

  selectRef(selfRef, client) {
    this.setState({ selfRef })
    this.closeDropdown()
    client.writeData({
      data: {
        // askAskingAs: JSON.stringify(selfRef)
        askAskingAsId: selfRef.id,
        askAskingAsName: selfRef.name
      }
    })
  }

  render() {
    return (
      <ApolloConsumer>
        {client => {
          const currentUserId = client.cache.data.data.ROOT_QUERY.currentUserId
          return (
            <Query query={GET_USER_CONTACTS} variables={{ id: currentUserId }}>
              {({ loading, error, data: { user } }) => {
                if (loading) return 'Asking as ...'

                const selfRefs = user.contacts.filter(contact => {
                  return contact.phone_number === user.phone_number
                })

                return (
                  <div>
                    <div
                      onClick={() => this.openDropdown()}
                      className="ask-question-selfref"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {this.state.selfRef
                        ? this.state.selfRef.name
                        : 'Asking as ...'}
                      <div className="ask-question-as-icon">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 -5 50 50"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="24 / music / player-play">
                            <path
                              id="icon"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M43.75 10.4167L6.25002 10.4167C4.60176 10.4167 3.60626 12.2401 4.49757 13.6266L23.2476 42.7933C24.0676 44.0689 25.9324 44.0689 26.7525 42.7933L45.5025 13.6266C46.3938 12.2401 45.3983 10.4167 43.75 10.4167ZM25 37.8141L10.066 14.5834L39.934 14.5834L25 37.8141Z"
                              fill="#979797"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    {this.referenceList(selfRefs, client, user)}
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
