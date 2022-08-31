// const Pool = require("pg").Pool;
// require("dotenv").config();

import pg from "pg";
import dotenv from "dotenv";

const Pool = pg.Pool;

dotenv.config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
    connectionString:
        process.env.NODE_ENV === "production" ? proConfig : devConfig,
});

export default pool;