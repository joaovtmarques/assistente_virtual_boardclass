import Factory from '@ioc:Adonis/Lucid/Factory'

import Class from 'App/Models/Class'
import Subject from 'App/Models/Subject'

export const SubjectFactory = Factory.define(Subject, ({ faker }) => {
  return {
    name: faker.name.findName(),
    description: faker.lorem.sentence(),
  }
}).build()

export const ClassFactory = Factory.define(Class, ({ faker }) => {
  return {
    name: faker.name.findName(),
  }
}).build()
