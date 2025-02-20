exports.up = function(knex) {
    return knex.schema.createTable('projeto_responsavel', table => {
        table.increments('id').primary();
        table.integer('projeto_id').notNullable();
        table.integer('responsavel_id').notNullable();
        table.enum('tipo_responsabilidade', ['lider_tecnico', 'gerente_projetos', 'suporte']).notNullable();
        table.timestamp('data_criacao').defaultTo(knex.fn.now());

        // Chaves estrangeiras
        table.foreign('projeto_id').references('projetos.id').onDelete('CASCADE');
        table.foreign('responsavel_id').references('responsaveis.id').onDelete('CASCADE');
        
        // Garante que não haja duplicatas
        table.unique(['projeto_id', 'responsavel_id', 'tipo_responsabilidade']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projeto_responsavel');
};