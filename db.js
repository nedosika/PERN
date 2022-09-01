import pg from "pg";
import config from "./config.js";

const Pool = pg.Pool;

const devConfig = `postgresql://${config.PG_USER}:${config.PG_PASSWORD}@${config.PG_HOST}:${config.PG_PORT}/${config.PG_DATABASE}`;

const proConfig = config.DATABASE_URL; //heroku addons

const pool = new Pool({
    connectionString:
        config.NODE_ENV === "production" ? proConfig : devConfig,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;