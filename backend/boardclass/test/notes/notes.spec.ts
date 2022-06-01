import Database from '@ioc:Adonis/Lucid/Database'
import Note from 'App/Models/Note'
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

let note = {} as Note

test.group('Note', (group) => {
  // index
  test('it should return all notes', async (assert) => {
    const { body } = await supertest(BASE_URL).get('/notes').send({}).expect(200)

    assert.exists(body.notes[0].id, 'Id undefined')
    assert.exists(body.notes[0].note, 'Note undefined')
  })

  // store
  test('it should create an note', async (assert) => {
    const payload = {
      note: 'Test ... test',
    }

    const { body } = await supertest(BASE_URL).post('/notes').send(payload).expect(201)

    assert.exists(body.note.id, 'Id undefined')
    assert.exists(body.note.note, 'Note undefined')
  })

  test('it should return 422 when required data is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL).post('/notes').send({}).expect(422)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'data is not provided')
    assert.equal(body.status, 422)
  })

  // destroy
  test('it should remove an evaluation', async () => {
    await supertest(BASE_URL).delete(`/notes/${note.id}`).send({}).expect(200)
  })

  test('it should return 404 when note id is not valid', async (assert) => {
    const { body } = await supertest(BASE_URL).delete(`/notes/0`).send({}).expect(404)

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.message, 'resource not found')
    assert.equal(body.status, 404)
  })

  group.before(async () => {
    const payload = {
      note: 'test ... test',
    }

    const { body } = await supertest(BASE_URL).post('/notes').send(payload).expect(201)

    note = body.note
  })
  group.after(async () => {
    await supertest(BASE_URL).delete(`/notes/${note.id}`)
  })
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
