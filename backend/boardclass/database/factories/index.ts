import Factory from '@ioc:Adonis/Lucid/Factory'
import Class from 'App/Models/Class'
import Laboratory from 'App/Models/Laboratory'
import Student from 'App/Models/Student'
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

export const StudentFactory = Factory.define(Student, ({ faker }) => {
  return {
    name: faker.name.findName(),
    ra: faker.internet.password(),
  }
}).build()

export const LaboratoryFactory = Factory.define(Laboratory, ({ faker }) => {
  return {
    name: faker.name.findName(),
  }
}).build()
