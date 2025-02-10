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
      getAllDrivers: [Driver]
    }
    
  type AuthPayload {
      user: User
      token: String
      message: String
      status: String
    }
    
  type MotoPayload {
      moto: Moto
      message: String
      status: String
    }
  
    type DriverPayload {
      driver: Driver
      message: String
      status: String
    }

    input ProductInput {
        id: String!
        quantity: Int!
    }

  type Mutation {
    createUser(name: String!, email: String!, password: String!, role: String): AuthPayload
    resetPassword(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createMoto(model: String!, registrationNumber: String!, mileage: Int!, ownerId: String): MotoPayload
    createMaintenance(motoId: String!, year: String!, type:MaintenanceType!, mileage: Int!, products: [ProductInput!]!): Maintenance
    validateMaintenance(maintenanceId: String!, mileage: Int!): Maintenance
    createStock(name: String!, cost: Float!, quantity: Int!): Stock
    createDriver(userId:String!, licenseNumber:String!, experienceYears:Int!):DriverPayload
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

  type Driver {
  id: ID!
  userId: String
  user: User          
  licenseNumber: String          
  experienceYears: Int
  createdAt :      String
  updatedAt:       String   
  motoTests:       [MotoTest]
  incidentHistory: [IncidentHistory]
}

type MotoTest {
  id: ID!
  driverId: String!
  motoId: String!
  startDate: String!
  endDate: String
  driver: Driver!
  moto: Moto!
  createdAt: String!
  updatedAt: String!
}

type IncidentHistory {
  id: ID!
  driverId: String!
  motoId: String!
  description: String!
  date: String!
  driver: Driver!
  moto: Moto!
  createdAt: String!
  updatedAt: String!
}

`;

export default typeDefs;
