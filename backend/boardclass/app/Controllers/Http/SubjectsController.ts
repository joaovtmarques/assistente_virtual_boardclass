import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequest from 'App/Exceptions/BadRequestException'
import Subject from 'App/Models/Subject'

export default class SubjectsController {
  public async index({ response }: HttpContextContract) {
    const subjects = await Subject.all()

    return response.ok({ subjects })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['name', 'description'])

    if (!payload.name || !payload.description) throw new BadRequest('data is not provided', 422)

    const subjectExists = await Subject.findBy('name', payload.name)

    if (subjectExists) throw new BadRequest('subject already exists', 409)

    const subject = await Subject.create(payload)

    return response.created({ subject })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const subject = await Subject.findByOrFail('id', id)

    return response.ok({ subject })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const subject = await Subject.findByOrFail('id', id)

    await subject.delete()

    return response.ok({})
  }
}
