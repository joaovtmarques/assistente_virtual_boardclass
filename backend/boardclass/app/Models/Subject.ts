import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Class from './Class'

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column()
  public description: String

  @manyToMany(() => Class)
  public classes: ManyToMany<typeof Class>
}
