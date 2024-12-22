export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkInsert('motoClients', [
      {
        id: 1,
        motoTypeId: 1,  // Référence au type de moto avec id 1 (Yamaha MT-07)
        kilometrage: 4500,  // Kilométrage actuel
      },
      {
        id: 2,
        motoTypeId: 2,  // Référence au type de moto avec id 2 (Honda CBR500R)
        kilometrage: 9000,  // Kilométrage actuel
      },
      {
        id: 3,
        motoTypeId: 3,  // Référence au type de moto avec id 3 (Kawasaki Ninja 400)
        kilometrage: 12000,  // Kilométrage actuel
      },
    ]);
  },

  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.bulkDelete('motoClients', {});
  },
};
