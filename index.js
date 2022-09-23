import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

import config from "./config.js";
import router from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const PORT = config.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

export const wsServer = new WebSocketServer({ noServer: true });
// wsServer.on('connection', socket => {
//     socket.on('message', message => {
//         const buf = Buffer.from(message, 'utf8');
//         const jsonMessage = JSON.parse(buf.toString());
//         switch (jsonMessage.action) {
//             case 'ECHO':
//                 socket.send(jsonMessage.data);
//                 break;
//             case 'PING':
//                 setTimeout(function() {
//                     socket.send('PONG');
//                 }, 2000);
//                 break;
//             default:
//                 console.log('Неизвестная команда');
//                 break;
//         }
//     });
// });

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

// app.get("/tokens", async (req, res) => {
//     try {
//         const allTodos = await pool.query("SELECT * FROM tokens");
//
//         res.json(allTodos.rows);
//     } catch (err) {
//         console.error(err.message);
//         res.json({
//             error: err.message
//         })
//     }
// });


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const server = app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});