import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Laboratories extends BaseSchema {
  protected tableName = 'laboratories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable().unique()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
