import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public date: Date

  @column()
  public subject_id: Number

  @column()
  public class_id: Number
}
