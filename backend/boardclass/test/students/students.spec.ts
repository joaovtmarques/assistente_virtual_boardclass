import Database from '@ioc:Adonis/Lucid/Database'
import Class from 'App/Models/Class'
import Subject from 'App/Models/Subject'
import Student from 'App/Models/Student'
import { ClassFactory, StudentFactory, SubjectFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

let student = {} as Student
let newClass = {} as Class
let subject = {} as Subject

test.group('Student', (group) => {
  test('it should return all students', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/students').send({}).expect(200)

    assert.exists(body.students[0].id, 'Id undefined')
    assert.exists(body.students[0].name, 'Name undefined')
    assert.exists(body.students[0].ra, 'R.A. number undefined')
    assert.exists(body.students[0].class_id, 'Class id undefined')
  })

  test('it should create an student', async (assert) => {
    const payload = {
      name: 'test',
      ra: '123456',
      class_id: newClass.id,
    }

    const { body } = await supertest(BASE_URL).post('/students').send(payload).expect(201)

    assert.exists(body.student.id, 'Id undefined')
    assert.exists(body.student.name, 'Name undefined')
    assert.exists(body.student.ra, 'R.A. undefined')
    assert.exists(body.student.class_id, 'Class ID undefined')
  })

  test('it should return 422 when required data is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/students').send({}).expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('it should return 404 when class id is not valid', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post(`/students`)
      .send({
        name: 'test',
        ra: '123456',
        class_id: 0,
      })
      .expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  test('it should return a student by id', async (assert) => {
    const { name: studentName, ra } = await StudentFactory.create()

    const newStudent = await supertest(BASE_URL)
      .post('/students')
      .send({
        name: studentName,
        ra,
        class_id: newClass.id,
      })
      .expect(201)

    const { body } = await supertest(BASE_URL)
      .get(`students/${newStudent.body.student.id}`)
      .expect(200)

    assert.exists(body.student.id, 'Id undefined')
    assert.exists(body.student.name, 'Name undefined')
    assert.exists(body.student.ra, 'R.A. undefined')
    assert.exists(body.student.class_id, 'Class id undefined')
  })

  test('it should return 404 when student id is not valid', async (assert) => {
    const { body } = await supertest(BASE_URL).get(`/students/0`).send({}).expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  group.before(async () => {
    const subjectPayload = await SubjectFactory.create()

    const { body: newSubject } = await supertest(BASE_URL)
      .post('/subjects')
      .send(subjectPayload)
      .expect(201)

    console.log(newSubject)

    subject = newSubject.subject

    const { body } = await supertest(BASE_URL)
      .post('/classes')
      .send({
        name: 'className',
        subject_id: newSubject.subject.id,
      })
      .expect(201)

    console.log(body.class)

    newClass = body.class

    const { name: studentName, ra } = await StudentFactory.create()

    const studentPayload = {
      name: studentName,
      ra,
      class_id: newClass.id,
    }

    const { body: data } = await supertest(BASE_URL)
      .post('/students')
      .send(studentPayload)
      .expect(201)

    student = data.student
  })
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
