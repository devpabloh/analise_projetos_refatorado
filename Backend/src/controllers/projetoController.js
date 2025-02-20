import db from '../config/database.js';

export const cadastrarProjeto = async (dados) => {
    try {
        // Inicia uma transação
        const trx = await db.transaction();

        try {
            // Insere o projeto
            const [projeto] = await trx('projetos')
                .insert({
                    nome: dados.nome,
                    descricao: dados.descricao,
                    data_preenchimento: dados.data_preenchimento,
                    data_inicial: dados.data_inicial,
                    data_entrega: dados.data_entrega,
                    status: dados.status,
                    tecnologias_frontend: dados.tecnologias_frontend,
                    tecnologias_backend: dados.tecnologias_backend,
                    banco_dados: dados.banco_dados,
                    metodologia_apis: dados.metodologia_apis,
                    possui_testes: dados.possui_testes,
                    descricao_testes: dados.descricao_testes,
                    possui_deploy: dados.possui_deploy,
                    descricao_deploy: dados.descricao_deploy,
                    ambiente_homologacao: dados.ambiente_homologacao,
                    ambiente_producao: dados.ambiente_producao,
                    deploy_automatizado: dados.deploy_automatizado,
                    deploy_implementado: dados.deploy_implementado,
                    possui_documentacao: dados.possui_documentacao,
                    tipo_documentacao: dados.tipo_documentacao,
                    documentacao_atualizada: dados.documentacao_atualizada,
                    possui_medidas_seguranca: dados.possui_medidas_seguranca,
                    possui_conformidade: dados.possui_conformidade
                })
                .returning('*');

            // Insere as relações projeto-responsável
            if (dados.responsaveis && dados.responsaveis.length > 0) {
                const projetoResponsaveis = dados.responsaveis.map(resp => ({
                    projeto_id: projeto.id,
                    responsavel_id: resp.responsavel_id,
                    tipo_responsabilidade: resp.tipo_responsabilidade
                }));

                await trx('projeto_responsavel').insert(projetoResponsaveis);
            }

            // Commit da transação
            await trx.commit();

            return projeto;
        } catch (error) {
            // Rollback em caso de erro
            await trx.rollback();
            throw error;
        }
    } catch (error) {
        console.error('Erro ao cadastrar projeto:', error);
        throw new Error('Erro ao cadastrar projeto no banco de dados');
    }
};