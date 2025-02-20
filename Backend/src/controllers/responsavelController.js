import db from '../config/database.js';

export const cadastrarResponsavel = async (dados) => {
    try {
        const [responsavel] = await db('responsaveis')
            .insert({
                nome: dados.nome,
                cargo: dados.cargo,
                telefone: dados.telefone,
                email: dados.email
            })
            .returning('*');

        return responsavel;
    } catch (error) {
        console.error('Erro ao cadastrar responsável:', error);
        throw new Error('Erro ao cadastrar responsável no banco de dados');
    }
};