require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {routes} = require('./routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json()); // estou dizendo que vou usar o json

routes.forEach(route =>{
    if(route.middleware){
        app[route.method.toLowerCase()](route.path, route.middleware, route.controller);
    }else{
        app[route.method.toLowerCase()](route.path, route.controller);
    
    }
});

app.use((error, requisicao, resposta, next)=>{
    console.error(error);
    return resposta.writeHead(500).end(JSON.stringify({
        erro: 'Erro interno do servidor'
    }));
});

app.listen(3000, () => {
    console.log(`O servidor está rodando na porta 3000`)
});