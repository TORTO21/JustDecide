import gql from 'graphql-tag';

export const FETCH_ASK_DETAILS = gql`
  query {
    askOptions @client 
    # @client {
    #   askOptions,
    #   askDate
    # }
    # deadlineDate @client 
    # askInvitees @client
  }
`