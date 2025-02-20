import { esquemaResponsavel, esquemaProjeto } from './schemas/esquemaDeRegrasFormulario.js';
import db from './config/database.js';
import validarRequisicao from './middleware/validarRequisicao.js';
import { cadastrarResponsavel } from './controllers/responsavelController.js';
import { cadastrarProjeto } from './controllers/projetoController.js';

export const Routes = [
    // Rota para listar todos os responsáveis
    {
        method: 'GET',
        path: '/responsaveis',
        controller: async ({requisicao, resposta}) => {
            try {
                const responsaveis = await db('responsaveis')
                    .select('*')
                    .orderBy('nome');
                return resposta.writeHead(200).end(JSON.stringify(responsaveis))
            } catch (error) {
                return resposta.writeHead(500).end(JSON.stringify({
                    erro: 'Erro ao buscar responsáveis'
                }))
            }
        }
    },

    // Rota para cadastrar um novo responsável
    {
        method: 'POST',
        path: '/responsaveis',
        middleware: validarRequisicao(esquemaResponsavel),
        controller: async (req, res) => {
            try {
                const responsavel = await cadastrarResponsavel(req.body);
    
                return res.status(201).json({
                    mensagem: 'Responsável cadastrado com sucesso',
                    responsavel
                });
            } catch (error) {
                console.error('Erro ao cadastrar responsável:', error);
                return res.status(500).json({
                    erro: 'Erro ao cadastrar responsável',
                    mensagem: error.message
                });
            }
        }
    },

    // Rota para cadastrar um novo projeto
    {
        method: 'POST',
        path: '/projetos',
        middleware: validarRequisicao(esquemaProjeto),
        controller: async (req, res) => {
            try {
                const projeto = await cadastrarProjeto(req.body);
    
                return res.status(201).json({
                    mensagem: 'Projeto cadastrado com sucesso',
                    projeto
                });
            } catch (error) {
                console.error('Erro ao cadastrar projeto:', error);
                return res.status(500).json({
                    erro: 'Erro ao cadastrar projeto',
                    mensagem: error.message
                });
            }
        }
    }
]