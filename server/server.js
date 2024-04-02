import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';



const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes); // middle
app.use('/api/messages', messageRoutes); // middle
app.use('/api/users', userRoutes); // middle

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get('/', (req, res) => {
    res.send(" worsdfsld");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


server.listen(PORT, () => {
    console.log('server is running...   PORT NO: ', PORT);
    connectToMongoDB();
});