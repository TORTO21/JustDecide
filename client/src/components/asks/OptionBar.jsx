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
  ask_id
}) => {
  const voteCount = option.votes.reduce(
    (acc, vote) => acc + (vote.direction === 'up' ? 1 : 0),
    0
  )

  const currentUserId = client.cache.data.data.ROOT_QUERY.currentUserId

  const invitation = invitations.filter(
    inv => inv.contact.user.id === currentUserId
  )[0]
  const contact_id = invitation ? invitation.contact.id : -1

  const isLoggedIn = client.cache.data.data.ROOT_QUERY.isLoggedIn

  const vote = option.votes.filter(v => v.contact.user.id === currentUserId)[0]

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

export default withApollo(OptionBar)
