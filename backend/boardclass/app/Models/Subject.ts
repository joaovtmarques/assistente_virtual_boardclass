import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column()
  public description: String
}
