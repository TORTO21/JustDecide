import {
  CURRENT_USER_CONTACT_DATA,
  CURRENT_USER_ID
} from '../../graphql/queries/user_queries'
import { Mutation, withApollo } from 'react-apollo'
import React, { useState } from 'react'

import { GET_ASK } from '../../graphql/queries/ask_queries'
import { NEW_OPTION } from '../../graphql/mutations/option_mutations'
import { Query } from 'react-apollo'

const NewOption = ({ cancel, ask, currentUser }) => {
  const [option, setOption] = useState('')
  const ask_id = ask.id

  const contact_id = ask.invitations
    .map(i => i.contact)
    .filter(c => c.phone_number === currentUser.phone_number)[0].id

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: '#0000006e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          margin: 'auto 20px',
          maxWidth: 350
        }}
      >
        <div
          className="green-gradient"
          style={{
            height: 12,
            alignSelf: 'stretch'
          }}
        />
        <div
          className="detail-text"
          style={{
            textAlign: 'center',
            margin: 20,
            fontSize: 16
          }}
        >
          Want to offer an alternative?
        </div>
        <input
          className="option-input drop-shadow"
          placeholder="type it here..."
          type="text"
          value={option}
          onChange={e => setOption(e.target.value)}
          style={{
            marginTop: 4,
            height: 'auto',
            borderRadius: 4,
            fontSize: 13,
            padding: 10
          }}
        />
        <div
          style={{
            margin: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <button
            style={{
              fontSize: 13,
              width: 80,
              height: 'auto',
              padding: 4,
              margin: 'auto 20px'
            }}
            className="solid-pink-button"
            onClick={cancel}
          >
            Cancel
          </button>
          <Mutation
            mutation={NEW_OPTION}
            variables={{
              creator_id: contact_id,
              ask_id,
              title: option
            }}
            onCompleted={cancel}
            refetchQueries={[{ query: GET_ASK, variables: { id: ask_id } }]}
          >
            {mutate => (
              <button
                style={{
                  fontSize: 13,
                  width: 80,
                  height: 'auto',
                  padding: 4,
                  margin: 'auto 20px'
                }}
                className="gradient-green-button"
                onClick={() => mutate()}
              >
                Add
              </button>
            )}
          </Mutation>
        </div>
      </div>
    </div>
  )
}

const WithCurrentUser = props => (
  <Query
    query={CURRENT_USER_CONTACT_DATA}
    variables={{
      id: props.client.cache.data.data.ROOT_QUERY.currentUserId
    }}
  >
    {({ loading, data: { user } }) => {
      if (loading) return null
      return <NewOption currentUser={user} {...props} />
    }}
  </Query>
)
export default withApollo(WithCurrentUser)
