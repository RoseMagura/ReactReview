import { Sequelize, DataType } from 'sequelize-typescript'
import * as dotenv from "dotenv";
import Quote from '../models/Quote';
import { quotes } from './quoteList';
import { Model } from 'sequelize/types';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.PGDATABASE,
  dialect: 'postgres',
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  models: [Quote]
});

export const testConn = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established succesfully.');
    } catch (error) {
        console.error(error);
    }
}

export const syncDB = async () => {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
}

export const seedDB = () => {
    quotes.forEach(async (quote) => {
        const dbRecord = await Quote.create({
            text: quote.text,
            author: quote.author
        });
        console.log(dbRecord.toJSON());
    });
}

export const getById = async (id: string): Promise<Model<Quote> | null> => {
    try {
        await sequelize.models.Quote.findByPk(id);
    } catch (error) {
        console.error(error);   
    } finally {
        return await sequelize.models.Quote.findByPk(id);
    }
}

export const getAll = async (): Promise<Model<Quote>[] | null> => {
    try {
        await sequelize.models.Quote.findAll();
    } catch (error) {
        console.error(error);   
    } finally {
        return await sequelize.models.Quote.findAll();
    }
}