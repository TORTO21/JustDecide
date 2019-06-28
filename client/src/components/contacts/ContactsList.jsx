import { ASK_INVITEES, GET_CONTACTS } from '../../graphql/queries/user_queries'
import React, { useEffect, useState } from 'react'

import { ApolloConsumer } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import SelectableContact from './SelectableContact'

const InnerList = ({ currentUserId, history, currentInvitees }) => {
  const [selected, setSelected] = useState([])

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
    history.push('/success')
  }

  return (
    <ApolloConsumer>
      {client => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Query query={GET_CONTACTS} variables={{ id: currentUserId }}>
              {({ loading, data }) => {
                if (loading) return null
                const contacts = data.user.contacts.sort((a, b) =>
                  a.name < b.name ? -1 : 1
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
                    <Link to="/addContacts">
                      <button
                        style={{ marginTop: 30 }}
                        className="gradient-green-button"
                        onClick={() => handleContinue(client)}
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

export default ({ currentUserId, history }) => {
  return (
    <Query query={ASK_INVITEES}>
      {({ loading, data }) => {
        if (loading) return null
        console.log(data.askInvitees)
        return (
          <InnerList
            currentUserId={currentUserId}
            history={history}
            currentInvitees={data.askInvitees}
          />
        )
      }}
    </Query>
  )
}
