import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterClassesEvaluations extends BaseSchema {
  protected tableName = 'notes'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('date')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('date')
    })
  }
}
