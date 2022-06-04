import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassesLaboratories extends BaseSchema {
  protected tableName = 'classes_laboratories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['class_id', 'laboratory_id'])
      table
        .integer('class_id')
        .unsigned()
        .references('id')
        .inTable('classes')
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('laboratory_id')
        .unsigned()
        .references('id')
        .inTable('laboratories')
        .notNullable()
        .onDelete('CASCADE')
      table.string('date').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
