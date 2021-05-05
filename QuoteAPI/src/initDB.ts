import { Sequelize } from 'sequelize-typescript'
import * as dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.PGDATABASE,
  dialect: 'postgres',
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  models: [__dirname + '/models']
});

export const testConn = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error(error);
    }
}
