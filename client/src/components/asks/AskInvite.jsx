import './AskInvite.css'

import { CURRENT_USER_ID } from '../../graphql/queries/user_queries'
import ContactsList from '../contacts/ContactsList'
import { Query } from 'react-apollo'
import React from 'react'

const AskInvite = ({ history }) => {
  return (
    <Query query={CURRENT_USER_ID}>
      {({ data: { currentUserId } }) => {
        return (
          <div className="overall-container">
            <div className="section-header invite">
              Invite others to cast their votes and share options
            </div>
            <ContactsList currentUserId={currentUserId} history={history} />
          </div>
        )
      }}
    </Query>
  )
}

export default AskInvite
