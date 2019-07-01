import { CURRENT_USER_CONTACT_DATA } from '../../graphql/queries/user_queries'
import { Query } from 'react-apollo'
import React from 'react'
import ThumbsDn from './ThumbsDn'
import ThumbsUp from './ThumbsUp'
import { withApollo } from 'react-apollo'

const OptionBar = ({
  option,
  colorClass,
  barPct,
  client,
  history,
  invitations,
  ask_id,
  currentUser
}) => {
  const voteCount = option.votes.reduce(
    (acc, vote) => acc + (vote.direction === 'up' ? 1 : 0),
    0
  )

  const contactIds = currentUser.contacts
    .filter(c => c.phone_number === currentUser.phone_number)
    .map(c => c.id)

  const invitation = invitations.filter(
    inv => contactIds.indexOf(inv.contact.id) >= 0
  )[0]

  const contact_id = invitation ? invitation.contact.id : -1

  const isLoggedIn = client.cache.data.data.ROOT_QUERY.isLoggedIn

  const votes = option.votes.filter(
    v => v.contact.phone_number === currentUser.phone_number
  )

  const vote = votes[votes.length - 1]

  const upClass =
    vote && vote.direction === 'up' ? 'thumbs_up-active' : 'thumbs_up'
  const dnClass =
    vote && vote.direction === 'down' ? 'thumbs_dn-active' : 'thumbs_dn'

  return (
    <div
      style={{
        padding: '0 12px 7px'
      }}
    >
      <div
        className="detail-text"
        style={{
          marginLeft: 23
        }}
      >
        {option.title}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          className="drop-shadow"
          style={{
            flex: 1,
            borderRadius: 50,
            marginRight: 10
          }}
        >
          <div
            className={colorClass}
            style={{
              borderRadius: 50,
              height: 40,
              width: barPct * 100 + '%',
              display: 'flex',
              alignItems: 'middle',
              justifyContent: 'flex-end'
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '50%',
                marginRight: 10,
                marginTop: 10,
                height: 20,
                minWidth: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {voteCount}
            </div>
          </div>
        </div>
        {isLoggedIn && contact_id !== -1 && (
          <ThumbsUp
            thumbClass={upClass}
            vote={vote}
            option={option}
            contact_id={contact_id}
            ask_id={ask_id}
          />
        )}
        {(!isLoggedIn || contact_id === -1) && (
          <div className={upClass} onClick={() => history.push('/')} />
        )}
        {isLoggedIn && contact_id !== -1 && (
          <ThumbsDn
            thumbClass={dnClass}
            vote={vote}
            option={option}
            contact_id={contact_id}
            ask_id={ask_id}
          />
        )}
        {(!isLoggedIn || contact_id === -1) && (
          <div className={dnClass} onClick={() => history.push('/')} />
        )}
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
      return <OptionBar currentUser={user} {...props} />
    }}
  </Query>
)
export default withApollo(WithCurrentUser)
