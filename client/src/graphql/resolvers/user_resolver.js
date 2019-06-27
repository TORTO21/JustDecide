import gql from 'graphql-tag';

export const resolvers = {
  Query: {
    getAskTime: (parent, args, { cache }) => {
      const { askDate } = cache.readQuery<any>({
        query: timeQuery
      });
      return askDate 
    }
  }
}