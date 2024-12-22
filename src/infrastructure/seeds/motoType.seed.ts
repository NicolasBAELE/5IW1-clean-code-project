export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkInsert('moto_types', [
      {
        id: 1,
        marque: 'Yamaha',
        modele: 'MT-07',
        maintenanceIntervalKm: 5000,   // Entretien tous les 5000 km
        maintenanceIntervalTime: 6,     // Entretien tous les 6 mois
      },
      {
        id: 2,
        marque: 'Honda',
        modele: 'CBR500R',
        maintenanceIntervalKm: 10000,  // Entretien tous les 10000 km
        maintenanceIntervalTime: 12,    // Entretien tous les 12 mois
      },
      {
        id: 3,
        marque: 'Kawasaki',
        modele: 'Ninja 400',
        maintenanceIntervalKm: 15000,  // Entretien tous les 15000 km
        maintenanceIntervalTime: 18,    // Entretien tous les 18 mois
      },
    ]);
  },

  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkDelete('moto_types', {});
  },
};
