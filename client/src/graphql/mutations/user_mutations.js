import gql from 'graphql-tag';

export const FETCH_ASK_DETAILS = gql`
  query {
    askOptions @client 
  }
`