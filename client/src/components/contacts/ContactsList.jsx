import React, { useState } from 'react'

import { ApolloConsumer } from 'react-apollo'
import { GET_CONTACTS } from '../../graphql/queries/user_queries'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import SelectableContact from './SelectableContact'

export default ({ currentUserId, history }) => {
  const [selected, setSelected] = useState([])

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
              {({ loading, data, context }) => {
                console.log(context)

                if (loading) return null
                const contacts = data.user.contacts.sort((a, b) =>
                  a.name < b.name ? -1 : 1
                )
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: 17,
                      maxHeight: 219,
                      overflowY: 'scroll',
                      borderBottom: '1px solid #e4e4e4',
                      padding: '0 30px',
                      minWidth: 211
                    }}
                  >
                    {contacts.map(c => (
                      <SelectableContact
                        key={c.id}
                        contact={c}
                        onSelect={() => handleSelect(c.id)}
                      />
                    ))}
                  </div>
                )
              }}
            </Query>
            <Link to="/addContacts">
              <button
                style={{ marginTop: 17 }}
                className="gradient-green-button"
              >
                Add Someone Else
              </button>
            </Link>
            <button
              onClick={() => handleContinue(client)}
              style={{ marginTop: 17 }}
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
