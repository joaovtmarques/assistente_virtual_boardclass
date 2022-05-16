import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'

import Student from './Student'
import Subject from 'App/Models/Subject'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: Number

  @column()
  public name: String

  @column()
  public subject_id: Number

  @manyToMany(() => Student, {
    pivotTable: 'classes_students',
  })
  public students: ManyToMany<typeof Student>

  @manyToMany(() => Subject, {
    pivotTable: 'classes_subjects',
  })
  public subject: ManyToMany<typeof Subject>
}
