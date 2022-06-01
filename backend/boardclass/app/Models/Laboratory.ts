import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'

export default class Laboratory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @manyToMany(() => Class, {
    pivotTable: 'classes_laboratories',
  })
  public classes: ManyToMany<typeof Class>
}
