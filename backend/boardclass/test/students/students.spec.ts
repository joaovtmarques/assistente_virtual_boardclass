import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

test.group('Student', (group) => {
  test('it should create an student', async (assert) => {
    const payload = {
      name: 'Português',
      ra: 123456,
      class_id: 1,
    }

    const { body } = await supertest(BASE_URL).post('/students').send(payload).expect(201)

    assert.exists(body.student.id, 'Id undefined')
    assert.exists(body.student.name, 'Name undefined')
    assert.exists(body.student.ra, 'R.A. undefined')
    assert.exists(body.student.class_id, 'Class ID undefined')
  })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
