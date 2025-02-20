exports.up = function(knex) {
    return knex.schema.createTable('projetos', table => {
        table.increments('id').primary();
        // Informações básicas
        table.string('nome').notNullable();
        table.text('descricao').notNullable();
        table.timestamp('data_preenchimento').defaultTo(knex.fn.now()).notNullable();
        table.date('data_inicial').notNullable();
        table.date('data_entrega').notNullable();
        table.string('status').notNullable();

        // Stack tecnológica
        table.text('tecnologias_frontend').notNullable();
        table.text('tecnologias_backend').notNullable();
        table.text('banco_dados').notNullable();
        table.text('metodologia_apis').notNullable();

        // Testes e Deploy
        table.boolean('possui_testes').notNullable().defaultTo(false);
        table.text('descricao_testes');
        table.boolean('possui_deploy').notNullable().defaultTo(false);
        table.text('descricao_deploy');
        table.text('ambiente_homologacao');
        table.text('ambiente_producao');
        table.boolean('deploy_automatizado').notNullable().defaultTo(false);
        table.boolean('deploy_implementado').notNullable().defaultTo(false);

        // Documentação
        table.boolean('possui_documentacao').notNullable().defaultTo(false);
        table.text('tipo_documentacao');
        table.text('link_documentacao');
        table.boolean('documentacao_atualizada').notNullable().defaultTo(false);

        // Segurança
        table.boolean('possui_medidas_seguranca').notNullable().defaultTo(false);
        table.text('descricao_medidas_seguranca');
        table.boolean('possui_conformidade').notNullable().defaultTo(false);
        table.text('descricao_conformidade');

        // Responsável
        table.string('nome_responsavel').notNullable();
        table.string('email_responsavel').notNullable();
        table.string('telefone_responsavel').notNullable();
        table.string('funcao_responsavel').notNullable();

        table.timestamp('data_criacao').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projetos');
};