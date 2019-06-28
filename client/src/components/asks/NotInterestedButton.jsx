import { CURRENT_USER_ID } from '../../graphql/queries/user_queries'
import { DELETE_INVITATION } from '../../graphql/mutations/invitation_mutations'
import { Mutation } from 'react-apollo'
import { Query } from 'react-apollo'
import React from 'react'

const handleButtonClick = (e, mutation, id) => {
  e.preventDefault()
  mutation({ variables: { id } })
}

const handleCompleted = history => history.push('/asks')

const NotInterestedButton = props => (
  <Query query={CURRENT_USER_ID}>
    {({ data: { currentUserId } }) => {
      const { invitations, history } = props
      const invitation = invitations.filter(
        inv => inv.contact.user.id === currentUserId
      )[0]

      const invitation_id = invitation ? invitation.id : -1
      return (
        <Mutation
          mutation={DELETE_INVITATION}
          onCompleted={() => handleCompleted(history)}
        >
          {(deleteInvitation, { data }) => (
            <button
              className="solid-pink-button"
              style={{
                marginTop: 17
              }}
              onClick={e =>
                handleButtonClick(e, deleteInvitation, invitation_id)
              }
            >
              Not Interested
            </button>
          )}
        </Mutation>
      )
    }}
  </Query>
)

export default NotInterestedButton
