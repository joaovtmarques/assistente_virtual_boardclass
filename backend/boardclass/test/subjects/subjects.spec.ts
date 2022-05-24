import Database from '@ioc:Adonis/Lucid/Database'
import Subject from 'App/Models/Subject'
import { SubjectFactory } from 'Database/factories'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

let subject = {} as Subject

test.group('Subject', (group) => {
  // index
  test('it should return all subjects', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/subjects').send({}).expect(200)

    assert.exists(body.subjects[0].id, 'Id undefined')
    assert.exists(body.subjects[0].name, 'Name undefined')
    assert.exists(body.subjects[0].description, 'Description undefined')
  })

  // store
  test('it should create an subject', async (assert) => {
    const payload = {
      name: 'Português',
      description: 'Matéria de português',
    }

    const { body } = await supertest(BASE_URL).post('/subjects').send(payload).expect(201)

    assert.exists(body.subject.id, 'Id undefined')
    assert.exists(body.subject.name, 'Name undefined')
    assert.exists(body.subject.description, 'Description undefined')
  })

  test('it should return 409 when subjects already exists', async (assert) => {
    const { name, description } = await SubjectFactory.create()

    await supertest(BASE_URL).post(`/subjects`).send({
      name,
      description,
    })

    const { body } = await supertest(BASE_URL)
      .post(`/subjects`)
      .send({
        name,
        description,
      })
      .expect(409)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 409)
  })

  test('it should return 422 when required data is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/subjects').send({}).expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  // show
  test('it should return a class by id', async (assert) => {
    const { body } = await supertest(BASE_URL).get(`/subjects/${subject.id}`).send({}).expect(200)

    assert.exists(body.subject.id, 'Id undefined')
    assert.exists(body.subject.name, 'Name undefined')
    assert.exists(body.subject.description, 'Description id undefined')
  })

  test('it should return 404 when subject id is not valid', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/subjects/0').expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  // destroy
  test('it should remove an subject', async () => {
    await supertest(BASE_URL).delete(`/subjects/${subject.id}`).send({}).expect(200)
  })

  test.only('it should return 404 when subject id is not valid', async (assert) => {
    const { body } = await supertest(BASE_URL).delete(`/subjects/0`).send({}).expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  group.before(async () => {
    const { description } = await SubjectFactory.create()

    const { body } = await supertest(BASE_URL)
      .post('/subjects')
      .send({
        name: 'testDisciplina',
        description,
      })
      .expect(201)

    subject = body.subject
  })
  group.after(async () => {
    await supertest(BASE_URL).delete(`/subjects/${subject.id}`)
  })
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
