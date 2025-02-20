exports.up = function(knex) {
    return knex.schema.createTable('projetos', table => {
        table.increments('id').primary();
        // Informações básicas
        table.string('nome').notNullable();
        table.text('descricao').notNullable();
        table.timestamp('data_preenchimento').notNullable();
        table.timestamp('data_inicial').notNullable();
        table.timestamp('data_entrega').notNullable();
        table.string('status').notNullable();

        // Stack tecnológica
        table.text('tecnologias_frontend').notNullable();
        table.text('tecnologias_backend').notNullable();
        table.text('tecnologias_banco').notNullable();
        table.text('metodologia_apis').notNullable();

        // Testes e Deploy
        table.boolean('possui_testes').notNullable();
        table.text('descricao_testes');
        table.boolean('processo_deploy').notNullable();
        table.boolean('deploy_automatizado').notNullable();
        table.boolean('deploy_implementado').notNullable();

        // Documentação
        table.boolean('possui_documentacao').notNullable();
        table.text('tipo_documentacao');
        table.boolean('documentacao_atualizada').notNullable();

        // Segurança
        table.boolean('possui_medidas_seguranca').notNullable();
        table.text('descricao_medidas_seguranca');
        table.boolean('possui_conformidade').notNullable();
        table.text('descricao_conformidade');

        table.timestamp('data_criacao').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projetos');
};