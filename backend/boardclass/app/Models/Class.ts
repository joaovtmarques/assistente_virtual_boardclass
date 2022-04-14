import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public name: String

  @column()
  public subject_id: Number
}
