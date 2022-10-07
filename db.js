import pg from "pg";
import config from "./config.js";

const Pool = pg.Pool;

const options = config.NODE_ENV === "production"
    ? {
        connectionString: config.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    }
    : {
        connectionString: config.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
        //connectionString: `postgresql://${config.PG_USER}:${config.PG_PASSWORD}@${config.PG_HOST}:${config.PG_PORT}/${config.PG_DATABASE}`
    }

const pool = new Pool(options);

export default pool;