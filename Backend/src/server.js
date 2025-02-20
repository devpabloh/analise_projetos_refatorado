import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Routes } from './routes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
app.use(express.json()); // estou dizendo que vou usar o json
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
});

Routes.forEach(route =>{
    if(route.middleware){
        app[route.method.toLowerCase()](route.path, route.middleware, (req, res, next) => {
            Promise.resolve(route.controller(req, res, next)).catch(next); });
    }else{
        app[route.method.toLowerCase()](route.path, (req, res, next) => {
            Promise.resolve(route.controller(req, res, next)).catch(next);
        });
    }
});

app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: error.message
    });
});

const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`O servidor está rodando na porta ${PORT}`);
});