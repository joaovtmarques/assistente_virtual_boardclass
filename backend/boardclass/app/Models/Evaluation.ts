import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public date: String

  @column()
  public subject_id: Number

  @column()
  public class_id: Number
}
