import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    createdAt: String!
  }

  type Query {
    users: [User!]!
  }
`;