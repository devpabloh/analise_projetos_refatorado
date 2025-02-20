import { esquemaResponsavel, esquemaProjeto } from './schemas/esquemaDeRegrasFormulario.js';
import db from './config/database.js';
import validarRequisicao from './middleware/validarRequisicao.js';
import { cadastrarResponsavel } from './controllers/responsavelController.js';

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
        controller: async ({requisicao, resposta}) => {
            try {
                const {responsaveis, ...dadosProjeto} = requisicao.body;
                await esquemaProjeto.parseAsync(requisicao.body);

                await db.transaction(async trx => {
                    // Primeiro insere o projeto
                    const [projeto] = await trx('projetos')
                        .insert(dadosProjeto)
                        .returning('*');

                    // Se houver responsáveis, vincula eles ao projeto
                    if(responsaveis && responsaveis.length > 0) {
                        await trx('projeto_responsavel')
                            .insert(
                                responsaveis.map(responsavel => ({
                                    projeto_id: projeto.id,
                                    responsavel_id: responsavel.responsavel_id,
                                    tipo_responsabilidade: responsavel.tipo_responsabilidade
                                }))
                            );
                    }

                    // Busca os dados completos dos responsáveis vinculados
                    const projetoResponsaveis = await trx('projeto_responsavel')
                        .join('responsaveis', 'responsaveis.id', 'projeto_responsavel.responsavel_id')
                        .where('projeto_id', projeto.id)
                        .select('responsaveis.*', 'projeto_responsavel.tipo_responsabilidade');

                    return resposta.writeHead(201).end(JSON.stringify({
                        mensagem: 'Projeto cadastrado com sucesso',
                        projeto: {
                            ...projeto,
                            responsaveis: projetoResponsaveis
                        }
                    }));
                });
            } catch (error) {
                if(error.errors) {
                    return resposta.writeHead(400).end(JSON.stringify({
                        erro: 'Erro de validação',
                        detalhes: error.errors
                    }));
                }
                return resposta.writeHead(500).end(JSON.stringify({
                    erro: 'Erro ao salvar projeto'
                }));
            }
        }
    }
]