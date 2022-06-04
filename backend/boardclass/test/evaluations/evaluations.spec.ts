import Database from '@ioc:Adonis/Lucid/Database'
import Evaluation from 'App/Models/Evaluation'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

let evaluation = {} as Evaluation

test.group('Evaluation', (group) => {
  // index
  test('it should return all evaluations', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/evaluations').send({}).expect(200)

    assert.exists(body.evaluations[0].id, 'Id undefined')
    assert.exists(body.evaluations[0].date, 'Date undefined')
    assert.exists(body.evaluations[0].subject_id, 'Subject id undefined')
    assert.exists(body.evaluations[0].class_id, 'Class id undefined')
  })

  // store
  test('it should create an evaluation', async (assert) => {
    const payload = {
      date: '00/00/0000',
      subject_id: 59,
      class_id: 40,
    }

    const { body } = await supertest(BASE_URL).post('/evaluations').send(payload).expect(201)

    assert.exists(body.evaluation.id, 'Id undefined')
    assert.exists(body.evaluation.date, 'Date undefined')
    assert.exists(body.evaluation.subject_id, 'Subject id undefined')
    assert.exists(body.evaluation.class_id, 'Class id undefined')
  })

  test('it should return 422 when required data is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/evaluations').send({}).expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)
  })

  test('it should return 404 when subject id is not valid', async (assert) => {
    const payload = {
      date: '00/00/0000',
      subject_id: 9999,
      class_id: 40,
    }

    const { body } = await supertest(BASE_URL).post(`/evaluations`).send(payload).expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  test('it should return 404 when class id is not valid', async (assert) => {
    const payload = {
      date: '00/00/0000',
      subject_id: 59,
      class_id: 9999,
    }

    const { body } = await supertest(BASE_URL).post(`/evaluations`).send(payload).expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  // destroy
  test('it should remove an evaluation', async () => {
    await supertest(BASE_URL).delete(`/evaluations/${evaluation.id}`).send({}).expect(200)
  })

  test('it should return 404 when evaluation id is not valid', async (assert) => {
    const { body } = await supertest(BASE_URL).delete(`/evaluations/0`).send({}).expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  group.before(async () => {
    const payload = {
      date: '10/10/2100',
      subject_id: 59,
      class_id: 40,
    }

    const { body } = await supertest(BASE_URL).post('/evaluations').send(payload).expect(201)

    evaluation = body.evaluation
  })
  group.after(async () => {
    await supertest(BASE_URL).delete(`/evaluations/${evaluation.id}`)
  })
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
