const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
    phone: String
    motos: [Moto]
    createdAt: String
    UpdatedAt: String
  }
  
  input UserFilterInput {
        id: ID
        name: String
        email: String
    }

  type Query {
      getUsers(payloadUser: UserFilterInput): [User]
    }
    
  type AuthPayload {
  user: User
  token: String
  message: String!
  status: String!
}

  type Mutation {
    createUser(name: String! email: String!, password: String!):AuthPayload
      }
      
  type Moto {
  id:String     
  model:String
  registrationNumber: String     
  mileage:Int
  ownerId:String
  owner:User
  createdAt:String     
  updatedAt:String     
}
`;

export default typeDefs;
