import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Evaluations extends BaseSchema {
  protected tableName = 'evaluations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.date('date').notNullable()
      table
        .integer('subject_id')
        .unsigned()
        .references('id')
        .inTable('subjects')
        .onDelete('CASCADE')
      table.integer('class_id').unsigned().references('id').inTable('classes').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
