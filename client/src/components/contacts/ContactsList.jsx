import React, { useEffect, useState } from 'react'

import { ApolloConsumer } from 'react-apollo'
import { FETCH_ASK_DETAILS } from '../../graphql/queries/ask_queries'
import { GET_CONTACTS } from '../../graphql/queries/user_queries'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import SelectableContact from './SelectableContact'

const ContactsList = ({ currentUserId, history, currentInvitees }) => {
  const [selected, setSelected] = useState(currentInvitees)

  useEffect(() => setSelected(currentInvitees), [currentInvitees])

  const handleSelect = id => {
    const idx = selected.indexOf(id)
    if (idx === -1) {
      setSelected([...selected, id])
    } else {
      setSelected([...selected.slice(0, idx), ...selected.slice(idx + 1)])
    }
  }

  const handleContinue = client => {
    client.writeData({
      data: { askInvitees: selected }
    })
    history.push('/askConfirm')
  }

  const saveInviteList = client => {
    console.log(selected)

    client.writeData({
      data: { askInvitees: selected }
    })
  }

  return (
    <ApolloConsumer>
      {client => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 550,
              margin: 'auto'
            }}
          >
            <Query query={GET_CONTACTS} variables={{ id: currentUserId }}>
              {({ loading, data }) => {
                if (loading) return null
                const contacts = data.user.contacts.sort((a, b) =>
                  a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
                )
                return (
                  <div
                    style={{
                      boxShadow: '0px 4px 15px #00000059',
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: 17,
                      padding: '10px',
                      width: '87%',
                      alignItems: 'center',
                      paddingBottom: 42
                    }}
                  >
                    <div
                      style={{
                        maxHeight: 219,
                        overflowY: 'scroll',
                        marginBottom: 10,
                        alignSelf: 'stretch',
                        padding: '0px 20px'
                      }}
                    >
                      {contacts.map(c => (
                        <SelectableContact
                          key={c.id}
                          contact={c}
                          onSelect={() => handleSelect(c.id)}
                          selected={selected}
                        />
                      ))}
                    </div>
                    <Link to={`/users/${currentUserId}/newContact`}>
                      <button
                        style={{ marginTop: 30 }}
                        className="gradient-green-button"
                        onClick={() => saveInviteList(client)}
                      >
                        Add Someone Else
                      </button>
                    </Link>
                  </div>
                )
              }}
            </Query>

            <button
              onClick={() => handleContinue(client)}
              style={{ marginTop: 35 }}
              className="solid-pink-button"
            >
              Continue
            </button>
          </div>
        )
      }}
    </ApolloConsumer>
  )
}

const WithExistingAnswers = ({ currentUserId, history }) => (
  <Query query={FETCH_ASK_DETAILS}>
    {({ loading, data }) => {
      if (loading) return null
      return (
        <ContactsList
          currentUserId={currentUserId}
          history={history}
          currentInvitees={data.askInvitees}
        />
      )
    }}
  </Query>
)

export default WithExistingAnswers
