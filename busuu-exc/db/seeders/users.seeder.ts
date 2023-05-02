import { QueryInterface } from 'sequelize';
import { userModel } from '../../src/users/domain/user.model';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert('users', [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
  ]);

  const users = await userModel.findAll();
  console.log('Users seeded:', users);
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkDelete('users', {});
};
