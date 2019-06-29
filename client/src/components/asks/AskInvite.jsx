import { CURRENT_USER_ID } from '../../graphql/queries/user_queries'
import ContactsList from '../contacts/ContactsList'
import { Query } from 'react-apollo'
import React from 'react'

const AskInvite = ({ history }) => {
  return (
    <Query query={CURRENT_USER_ID}>
      {({ data: { currentUserId } }) => {
        return (
          <div
            className="background"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              className="section-header"
              style={{
                marginTop: '20%',
                fontSize: '35px',
                color: 'white',
                lineHeight: '38px',
                textAlign: 'center',
                width: '80%'
              }}
            >
              Invite others to cast their votes and share options
            </div>
            <div
              style={{
                background: 'white',
                width: '100%',
                flex: 1,
                marginTop: 21
              }}
            >
              <ContactsList currentUserId={currentUserId} history={history} />
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default AskInvite
