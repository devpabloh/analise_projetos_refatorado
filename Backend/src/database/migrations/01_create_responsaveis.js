export const up = function(knex) {
    return knex.schema.createTable('responsaveis', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('cargo').notNullable();
        table.string('telefone').notNullable();
        table.string('email').notNullable().unique();
        table.timestamp('data_criacao').defaultTo(knex.fn.now());
    });
};

export const down = function(knex) {
    return knex.schema.dropTable('responsaveis');
};