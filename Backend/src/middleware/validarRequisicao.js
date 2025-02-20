const validarRequisicao = (schema) => {
    return async (req, res, next) => {
        try {
            console.log('Dados recebidos:', req.body);
            const dadosValidados = await schema.parseAsync(req.body);
            console.log('Dados validados:', dadosValidados);
            req.body = dadosValidados; // Atualiza o body com os dados validados
            next();
        } catch (error) {
            console.error('Erro de validação:', error);
            return res.status(400).json({
                erro: 'Erro de validação',
                detalhes: error.errors
            });
        }
    }
}

export default validarRequisicao;