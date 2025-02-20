const validarRequisicao = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                erro: 'Erro de validação',
                detalhes: error.errors
            });
        }
    }
}

export default validarRequisicao;