import { LaboratoryFactory } from './../../database/factories/index'
import Database from '@ioc:Adonis/Lucid/Database'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

test.group('Laboratory', (group) => {
  // index
  test('it should return all laboratories', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/laboratories').send({}).expect(200)

    assert.exists(body.laboratories[0].id, 'Id undefined')
    assert.exists(body.laboratories[0].name, 'Name undefined')
  })

  // store
  test('it should create an laboratory', async (assert) => {
    const payload = await LaboratoryFactory.create()

    const { body } = await supertest(BASE_URL)
      .post('/laboratories')
      .send({ name: payload })
      .expect(201)

    assert.exists(body.laboratory.id, 'Id undefined')
    assert.exists(body.laboratory.name, 'Name undefined')
  })

  test('it should return 422 when required data is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/laboratories').send({}).expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('it should return 409 when laboratory already exists', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/laboratories')
      .send({ name: 'lab test' })
      .expect(409)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'laboratory already exists')
    assert.equal(body.status, 409)
  })

  // show
  test('it should return a laboratory by id', async (assert) => {
    const { body } = await supertest(BASE_URL).get(`/laboratories/1`).send().expect(200)

    assert.exists(body.laboratory.id, 'Id undefined')
    assert.exists(body.laboratory.name, 'Name undefined')
  })

  test('it should return 404 when laboratory id is not valid', async (assert) => {
    const { body } = await supertest(BASE_URL).get(`/laboratories/0`).send().expect(404)
  })

  // schedule laboratory
  test('it should schedule a laboratory', async (assert) => {
    const data = {
      class_id: 37,
      laboratory_id: 1,
      date: '00/00/0000',
    }

    await supertest(BASE_URL).post('/laboratories/schedule').send(data).expect(200)
  })

  test('it should return 422 when required data is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/laboratories/schedule').send().expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'data is not provided')
    assert.equal(body.status, 422)
  })

  test('it should return 404 when class id is not valid', async (assert) => {
    const data = {
      class_id: 9999,
      laboratory_id: 1,
      date: '00/00/0000',
    }

    const { body } = await supertest(BASE_URL).post('/laboratories/schedule').send(data).expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  test('it should return 404 when laboratory id is not valid', async (assert) => {
    const data = {
      class_id: 37,
      laboratory_id: 9999,
      date: '00/00/0000',
    }

    const { body } = await supertest(BASE_URL).post('/laboratories/schedule').send(data).expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  test('it should return 409 when the schedule already exists', async (assert) => {
    const data = {
      class_id: 37,
      laboratory_id: 1,
      date: '99/99/9999',
    }

    const { body } = await supertest(BASE_URL).post('/laboratories/schedule').send(data).expect(409)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'schedule already exists')
    assert.equal(body.status, 409)
  })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
