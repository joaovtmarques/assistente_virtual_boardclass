import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequest from 'App/Exceptions/BadRequestException'
import Class from 'App/Models/Class'
import Evaluation from 'App/Models/Evaluation'
import Subject from 'App/Models/Subject'

export default class EvaluationsController {
  public async index({ response }: HttpContextContract) {
    const evaluations = await Evaluation.all()

    return response.ok({ evaluations })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['date', 'subject_id', 'class_id'])

    if (!payload.date || !payload.subject_id || !payload.class_id)
      throw new BadRequest('data is not provided', 422)

    const subjectExists = await Subject.findBy('id', payload.subject_id)
    const classExists = await Class.findBy('id', payload.class_id)

    if (!subjectExists || !classExists) throw new BadRequest('resource not found', 404)

    const evaluation = await Evaluation.create({
      date: payload.date,
      subject_id: payload.subject_id,
    })

    await evaluation.related('classes').attach([payload.class_id])

    return response.created({ evaluation })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const evalExists = await Evaluation.findBy('id', id)

    if (!evalExists) throw new BadRequest('resource not found', 404)

    evalExists.delete()

    return response.ok({})
  }
}
