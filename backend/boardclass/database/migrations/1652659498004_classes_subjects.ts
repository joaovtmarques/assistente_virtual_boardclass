import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassesSubjects extends BaseSchema {
  protected tableName = 'classes_subjects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['class_id', 'subject_id'])
      table.integer('class_id').unsigned().references('id').inTable('classes').notNullable()
      table
        .integer('subject_id')
        .unsigned()
        .references('id')
        .inTable('subjects')
        .notNullable()
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
