const validarRequisicao = (schema)=>{
    return async (requisicao, resposta, next)=>{
        try {
            await schema.parseAsync(requisicao.body);
            next();
        } catch (error) {
            return resposta.writeHead(400).end(JSON.stringify({
                erro: 'Erro de validação',
                detalhes: error.errors
            }))
        }
    }
}

export default validarRequisicao;