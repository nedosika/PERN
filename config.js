import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    PG_HOST: process.env.PG_HOST,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_USER: process.env.PG_USER,
    PG_PORT: process.env.PG_PORT,
    PG_PASSWORD: process.env.PG_PASSWORD,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_ACCESS_SECRET_PHRASE: process.env.JWT_ACCESS_SECRET_PHRASE,
    JWT_REFRESH_SECRET_PHRASE: process.env.JWT_REFRESH_SECRET_PHRASE,
    CLIENT_URL: process.env.CLIENT_URL,
    API_URL: process.env.API_URL
}