import { Sequelize } from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: config.port,
  dialectOptions: {
    uuidExtension: 'binary',
  },
});

export async function connectToDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
  }
}

export { sequelize };
