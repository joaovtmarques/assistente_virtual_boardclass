import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassesEvaluations extends BaseSchema {
  protected tableName = 'classes_evaluations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['class_id', 'evaluation_id'])
      table
        .integer('class_id')
        .unsigned()
        .references('id')
        .inTable('classes')
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('evaluation_id')
        .unsigned()
        .references('id')
        .inTable('evaluations')
        .notNullable()
        .onDelete('CASCADE')
      table.string('date').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
