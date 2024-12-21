export const appConfig = {
    db: {
      type: process.env.DB_TYPE || 'inMemory',
      connectionString: process.env.DB_CONNECTION_STRING || ''
    }
  };