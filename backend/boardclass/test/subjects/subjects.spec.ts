import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

test.group('Subject', (group) => {
  // test('it should create an subject', async (assert) => {
  //   const payload = {
  //     name: 'Português',
  //     description: 'Matéria de português',
  //   }

  //   const { body } = await supertest(BASE_URL).post('/subjects').send(payload).expect(201)

  //   assert.exists(body.subject.id, 'Id undefined')
  //   assert.exists(body.subject.name, 'Name undefined')
  //   assert.exists(body.subject.description, 'Description undefined')
  // })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
