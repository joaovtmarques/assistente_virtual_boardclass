import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreatePublisherIdRelations extends BaseSchema {
  protected tableName = 'evaluations'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('date').notNullable().alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('date')
    })
  }
}
