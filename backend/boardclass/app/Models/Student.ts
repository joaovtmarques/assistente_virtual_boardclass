import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
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

  @manyToMany(() => Class, {
    pivotTable: 'classes_students',
  })
  public class: ManyToMany<typeof Class>
}
