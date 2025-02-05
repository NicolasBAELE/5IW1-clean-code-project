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
    updatedAt: String
  }
  
  input UserFilterInput {
        id: ID
        name: String
        email: String
    }

  type Query {
      getUsers(payloadUser: UserFilterInput): [User]
      getAllMotos(motoId: String): [Moto]
    }
    
  type AuthPayload {
  user: User
  token: String
  message: String!
  status: String!
}

  type Mutation {
    createUser(name: String! email: String!, password: String!):AuthPayload
    login(email: String!, password: String!): AuthPayload
    createMoto(model: String!, registrationNumber: String!, mileage: Int!, ownerId: String): Moto
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
  maintenance:Maintenance  
}

enum MaintenanceType {
    PREVENTIVE
    CURATIVE
  }

  type Maintenance {
    id: ID!
    motoId: String!
    moto: Moto!
    type: MaintenanceType!
    scheduledDate: String
    completedDate: String
    mileageAtService: Int
    cost: Float
    notes: String
    createdAt: String!
    updatedAt: String!
  }
`;

export default typeDefs;
