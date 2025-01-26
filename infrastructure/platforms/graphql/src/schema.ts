const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    role: String
    tati: Int
  }
  
  input UserFilterInput {
        id: ID
        name: String
        email: String
    }

  type Query {
      getUsers(payloadUser: UserFilterInput): [User]
    }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

export default typeDefs;
