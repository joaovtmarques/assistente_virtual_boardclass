import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Laboratory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String
}
