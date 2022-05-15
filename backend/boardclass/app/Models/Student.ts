import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column()
  public ra: String

  @column()
  public class_id: Number

  @hasOne(() => Class)
  public class: HasOne<typeof Class>
}
