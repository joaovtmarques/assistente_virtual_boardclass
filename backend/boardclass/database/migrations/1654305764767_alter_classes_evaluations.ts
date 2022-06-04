import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterClassesEvaluations extends BaseSchema {
  protected tableName = 'classes_evaluations'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('date')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('date')
    })
  }
}
