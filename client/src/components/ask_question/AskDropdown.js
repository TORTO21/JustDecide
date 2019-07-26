import React, { Component } from 'react'

import { ApolloConsumer } from 'react-apollo'
import CurrentUserWrapper from '../../graphql/queries/current_user_wrapper'
import GetUserContactsWrapper from '../../graphql/queries/get_user_contacts_wrapper'
import { NEW_ASK_DETAILS } from '../../graphql/queries/new_ask_details_wrapper'
import NewContactWrapper from '../../graphql/mutations/new_contact_wrapper'

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
    return e => this.setState({ [field]: e.target.value })
  }

  referenceList(selfRefs, client, user_and_contacts, newContact) {
    if (this.state.dropdown) {
      return (
        <div className="ask-question-dropdown drop-shadow">
          <form
            onSubmit={e => {
              e.preventDefault()
              newContact({
                phone_number: user_and_contacts.phone_number,
                owner_id: user_and_contacts.id,
                name: this.state.newRef
              }).then(({ data: { newContact } }) => {
                this.selectRef(newContact, client)
              })
            }}
          >
            <input
              className="ask-question-ref-new"
              placeholder="Something else... (ex. 'Dad')"
              onChange={this.update('newRef')}
            />
          </form>
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

    const { newAsk } = client.readQuery({ query: NEW_ASK_DETAILS })

    client.writeData({
      data: {
        newAsk: {
          ...newAsk,
          askAskingAsId: selfRef.id,
          askAskingAsName: selfRef.name
        }
      }
    })
  }

  render() {
    const { user_and_contacts, newContact } = this.props

    const selfRefs = user_and_contacts.contacts.filter(contact => {
      return contact.phone_number === user_and_contacts.phone_number
    })

    return (
      <ApolloConsumer>
        {client => (
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
              {this.state.selfRef ? this.state.selfRef.name : 'Asking as ...'}
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
            {this.referenceList(
              selfRefs,
              client,
              user_and_contacts,
              newContact
            )}
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default props => (
  <CurrentUserWrapper {...props}>
    <GetUserContactsWrapper>
      <NewContactWrapper>
        <AskDropdown />
      </NewContactWrapper>
    </GetUserContactsWrapper>
  </CurrentUserWrapper>
)
