import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import BadRequest from 'App/Exceptions/BadRequestException'
import Class from 'App/Models/Class'
import Laboratory from 'App/Models/Laboratory'

export default class LaboratoriesController {
  public async index({ response }: HttpContextContract) {
    const laboratories = await Laboratory.all()

    return response.ok({ laboratories })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['name'])

    if (!payload.name || payload.name === '') throw new BadRequest('data is not provided', 422)

    const labExists = await Laboratory.findBy('name', payload.name)

    if (labExists) throw new BadRequest('laboratory already exists', 409)

    const lab = await Laboratory.create(payload)

    return response.created({ laboratory: lab })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const labExists = await Laboratory.findBy('id', id)

    if (!labExists) throw new BadRequest('resource not found', 404)

    return response.ok({ laboratory: labExists })
  }

  public async scheduleLaboratory({ request, response }: HttpContextContract) {
    const data = request.only(['class_id', 'laboratory_id', 'date'])

    if (!data.class_id || !data.laboratory_id || !data.date)
      throw new BadRequest('data is not provided', 422)

    const labExists = await Laboratory.findBy('id', data.laboratory_id)
    const classExists = await Class.findBy('id', data.class_id)

    if (!labExists) throw new BadRequest('resource not found', 404)
    if (!classExists) throw new BadRequest('resource not found', 404)

    const scheduleExists = await Database.from('classes_laboratories')
      .where('class_id', data.class_id)
      .andWhere('laboratory_id', data.laboratory_id)
      .first()

    if (scheduleExists) throw new BadRequest('schedule already exists', 409)

    await Database.table('classes_laboratories').insert({
      class_id: data.class_id,
      laboratory_id: data.laboratory_id,
      date: data.date,
    })

    return response.ok({})
  }
}
