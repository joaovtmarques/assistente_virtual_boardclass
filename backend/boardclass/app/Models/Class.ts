import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Subject from 'App/Models/Subject'

import Evaluation from './Evaluation'
import Laboratory from './Laboratory'
import Student from './Student'

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

  @manyToMany(() => Laboratory, {
    pivotTable: 'classes_laboratories',
  })
  public laboratories: ManyToMany<typeof Laboratory>

  @manyToMany(() => Evaluation, {
    pivotTable: 'classes_evaluations',
  })
  public evaluations: ManyToMany<typeof Evaluation>
}
