import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreatePublisherIdRelations extends BaseSchema {
  protected tableName = 'evaluations'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('class_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('class_id')
    })
  }
}
