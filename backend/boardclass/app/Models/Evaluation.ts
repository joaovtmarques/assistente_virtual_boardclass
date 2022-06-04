import { BaseModel, column, hasOne, HasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

import Class from './Class'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public date: String

  @column()
  public subject_id: Number

  @column()
  public class_id: Number

  @manyToMany(() => Class, {
    pivotTable: 'classes_evaluations',
  })
  public classes: ManyToMany<typeof Class>
}
