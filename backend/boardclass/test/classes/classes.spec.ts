import test from 'japa'
import supertest from 'supertest'
import Class from 'App/Models/Class'
import Subject from 'App/Models/Subject'
import Database from '@ioc:Adonis/Lucid/Database'
import { ClassFactory, SubjectFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

let subject = {} as Subject
let newClass = {} as Class

test.group('Class', (group) => {
  // index
  test('it should return all classes', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/classes').send({}).expect(200)

    assert.exists(body.classes[0].id, 'Id undefined')
    assert.exists(body.classes[0].name, 'Name undefined')
    assert.exists(body.classes[0].subject_id, 'Subject id undefined')
  })

  // store
  test('it should create an class', async (assert) => {
    const payload = {
      name: 'Turma 1',
      subject_id: subject.id,
    }

    const { body } = await supertest(BASE_URL).post('/classes').send(payload).expect(201)

    assert.exists(body.class.id, 'Id undefined')
    assert.exists(body.class.name, 'Name undefined')
    assert.exists(body.class.subject_id, 'Subject id undefined')
  })

  test('it should return 409 when class already exists', async (assert) => {
    const { id } = await SubjectFactory.create()
    const { name } = await ClassFactory.create()

    await supertest(BASE_URL).post(`/classes`).send({
      name,
      subject_id: id,
    })

    const { body } = await supertest(BASE_URL)
      .post(`/classes`)
      .send({
        name,
        subject_id: id,
      })
      .expect(409)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 409)
  })

  test('it should return 422 when required data is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/classes').send({}).expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('it should return 404 when subject id is not valid', async (assert) => {
    const { name } = await ClassFactory.create()

    const { body } = await supertest(BASE_URL)
      .post(`/classes`)
      .send({
        name,
        subject_id: '0',
      })
      .expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  // show
  test('it should return a class by id', async (assert) => {
    const payload = {
      name: 'turma',
      subject_id: subject.id,
    }

    const data = await supertest(BASE_URL).post('/classes').send(payload).expect(201)

    const { body } = await supertest(BASE_URL)
      .get(`/classes/${data.body.class.id}`)
      .send({})
      .expect(200)

    assert.exists(body.class.id, 'Id undefined')
    assert.exists(body.class.name, 'Name undefined')
    assert.exists(body.class.subject_id, 'Subject id undefined')
  })

  test('it should return 404 when class id is not valid', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/classes/0').expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  // update
  test('it should update an class', async (assert) => {
    const name = 'test1'
    const subjectPayload = await SubjectFactory.create()

    const newSubject = await supertest(BASE_URL).post('/subjects').send(subjectPayload).expect(201)

    const { body } = await supertest(BASE_URL)
      .put(`/classes/${newClass.id}`)
      .send({
        name,
        subject_id: newSubject.body.subject.id,
      })
      .expect(200)

    assert.exists(body.class, 'Class undefined')
    assert.equal(body.class.name, name)
    assert.equal(body.class.subject_id, newSubject.body.subject.id)
    assert.equal(body.class.id, newClass.id)
  })

  test('it should return 404 when subject id is not valid', async (assert) => {
    const name = 'test1'

    const { body } = await supertest(BASE_URL)
      .put(`/classes/${newClass.id}`)
      .send({
        name,
        subject_id: 0,
      })
      .expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  test('it should return 404 when class id is not valid', async (assert) => {
    const name = 'test1'
    const subjectPayload = await SubjectFactory.create()

    const newSubject = await supertest(BASE_URL).post('/subjects').send(subjectPayload).expect(201)

    const { body } = await supertest(BASE_URL)
      .put(`/classes/0`)
      .send({
        name,
        subject_id: newSubject.body.subject.id,
      })
      .expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  test('it should return 422 when required data is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL).put(`/classes/${newClass.id}`).send({}).expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  //delete
  test('it should remove an class', async () => {
    await supertest(BASE_URL).delete(`/classes/${newClass.id}`).send({}).expect(200)
  })

  test('it should return 404 when class id is not valid', async (assert) => {
    const { body } = await supertest(BASE_URL).delete(`/classes/0`).send({}).expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  group.before(async () => {
    const subjectPayload = await SubjectFactory.create()

    const newSubject = await supertest(BASE_URL).post('/subjects').send(subjectPayload).expect(201)

    const classPayload = {
      name: 'test',
      subject_id: newSubject.body.subject.id,
    }

    const { body } = await supertest(BASE_URL).post('/classes').send(classPayload).expect(201)

    subject = newSubject.body.subject
    newClass = body.class
  })
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
