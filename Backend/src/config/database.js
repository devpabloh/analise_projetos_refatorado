import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

// Mudando para export default
const db = knex({
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
    }
});

export default db;