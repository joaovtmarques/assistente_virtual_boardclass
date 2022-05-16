import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassesStudents extends BaseSchema {
  protected tableName = 'classes_students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['class_id', 'student_id'])
      table.integer('class_id').unsigned().references('id').inTable('classes').notNullable()
      table
        .integer('student_id')
        .unsigned()
        .references('id')
        .inTable('students')
        .notNullable()
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
