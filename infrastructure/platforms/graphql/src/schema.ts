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

  type Query {
      getUsers(userId: String): [User]
      getAllMotos(motoId: String): [Moto]
      getAllStocks: [Stock]
    }
    
  type AuthPayload {
      user: User
      token: String
      message: String!
      status: String!
    }
    input ProductInput {
        id: String!
        quantity: Int!
    }

  type Mutation {
    createUser(name: String!, email: String!, password: String!, role: String): AuthPayload
    resetPassword(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createMoto(model: String!, registrationNumber: String!, mileage: Int!, ownerId: String): Moto
    createMaintenance(motoId: String!, year: String!, type:MaintenanceType!, mileage: Int!, products: [ProductInput!]!): Maintenance
    validateMaintenance(maintenanceId: String!, mileage: Int!): Maintenance
    createStock(name: String!, cost: Float!, quantity: Int!): Stock
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
      maintenances:[Maintenance]  
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
  
    type Stock {
      id: ID!     
      name: String!
      quantity: Int!
      cost: Float!
      createdAt: String!   
      updatedAt: String!  
    }
`;

export default typeDefs;
