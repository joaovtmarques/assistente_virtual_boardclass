import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'

import Student from './Student'
import Subject from 'App/Models/Subject'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public name: String

  @column()
  public subject_id: Number

  @hasMany(() => Student, {
    foreignKey: 'class_id',
  })
  public students: HasMany<typeof Student>

  @hasOne(() => Subject, {
    foreignKey: 'class_id',
  })
  public subject: HasOne<typeof Subject>
}
