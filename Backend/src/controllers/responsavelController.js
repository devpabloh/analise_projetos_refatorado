import db from '../config/database.js';

export const cadastrarResponsavel = async (dados) => {
    try {
        // Primeiro, verifica se o email já existe
        const emailExistente = await db('responsaveis')
            .where('email', dados.email)
            .first();

        if (emailExistente) {
            throw new Error('Email já cadastrado');
        }

        // Validação dos campos obrigatórios
        if (!dados.nome || !dados.cargo || !dados.telefone || !dados.email) {
            throw new Error('Todos os campos são obrigatórios');
        }

        // Tenta inserir o novo responsável
        const [responsavel] = await db('responsaveis')
            .insert({
                nome: dados.nome,
                cargo: dados.cargo,
                telefone: dados.telefone,
                email: dados.email
            })
            .returning(['id', 'nome', 'cargo', 'telefone', 'email']);

        if (!responsavel) {
            throw new Error('Erro ao inserir responsável no banco de dados');
        }

        return responsavel;

    } catch (error) {
        console.error('Erro detalhado:', error);
        
        if (error.message.includes('já cadastrado')) {
            throw error;
        }
        
        if (error.code === '23505') { // Código de violação de unicidade do PostgreSQL
            throw new Error('Email já cadastrado');
        }

        throw new Error('Erro ao cadastrar responsável no banco de dados');
    }
};