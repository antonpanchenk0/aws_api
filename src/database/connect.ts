import { Sequelize } from 'sequelize';
import * as dontEnv from 'dotenv';

dontEnv.config();

if (!process.env.POSTGRE_DATABASE || !process.env.POSTGRE_USERNAME || !process.env.POSTGRE_PASSWORD) {
  throw new Error('Something wrong with database connection.');
}

export const sequelize = new Sequelize(
  process.env.POSTGRE_DATABASE,
  process.env.POSTGRE_USERNAME,
  process.env.POSTGRE_PASSWORD,
  {
    host: process.env.POSTGRE_HOST,
    port: Number(process.env.POSTGRE_PORT),
    dialect: 'postgres',
    logging: false,
  },
);

export default sequelize;