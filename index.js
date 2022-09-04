import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

import pool from "./db.js";
import config from "./config.js";
import router from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const PORT = config.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: config.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

if (config.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
        res.json({
            error: err.message
        })
    }
});

app.get("/tokens", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM tokens");

        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
        res.json({
            error: err.message
        })
    }
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});