import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subject from 'App/Models/Subject'

export default class SubjectsController {
  public async index({ request, response }: HttpContextContract) {
    const subjects = await Subject.all()

    return response.ok({ subjects })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['name', 'description'])

    const subject = await Subject.create(payload)

    return response.created({ subject })
  }

  public async show({ request, response }: HttpContextContract) {
    return response.ok({})
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const subject = await Subject.findByOrFail('id', id)

    await subject.delete()

    return response.ok({})
  }
}
