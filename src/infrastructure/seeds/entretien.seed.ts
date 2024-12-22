export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkInsert('entretiens', [
      {
        motoClientId: 1,   // Référence à MotoClient avec id 1
        kilometrage: 4000,  // Kilométrage lors de l'entretien
        date: new Date('2023-11-01'),
        type: 'Préventif',
      },
      {
        motoClientId: 2,   // Référence à MotoClient avec id 2
        kilometrage: 9000,  // Kilométrage lors de l'entretien
        date: new Date('2023-12-01'),
        type: 'Curatif',
      },
      {
        motoClientId: 3,   // Référence à MotoClient avec id 3
        kilometrage: 10000,  // Kilométrage lors de l'entretien
        date: new Date('2023-10-01'),
        type: 'Préventif',
      },
    ]);
  },

  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkDelete('entretiens', {});
  },
};
