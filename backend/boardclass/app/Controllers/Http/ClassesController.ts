import Laboratory from 'App/Models/Laboratory'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import BadRequest from 'App/Exceptions/BadRequestException'

import Class from 'App/Models/Class'
import Subject from 'App/Models/Subject'

export default class ClassesController {
  public async index({ response }: HttpContextContract) {
    const classes = await Class.all()

    return response.ok({ classes })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['name', 'subject_id'])

    if (!payload.name || !payload.subject_id) throw new BadRequest('data is not provided', 422)

    if (payload.subject_id !== 0) {
      await Subject.findByOrFail('id', payload.subject_id)
    } else {
      throw new BadRequest('resource not found', 404)
    }

    const classExists = await Class.findBy('name', payload.name)

    if (classExists) throw new BadRequest('class already exists', 409)

    const newClass = await Class.create(payload)
    await newClass.related('subject').attach([payload.subject_id])

    return response.created({ class: newClass })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const classExists = await Class.findByOrFail('id', id)

    await classExists.load('subject')
    await classExists.load('students')
    await classExists.load('laboratories')
    await classExists.load('evaluations')

    return response.ok({ class: classExists })
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const data = request.only(['name', 'subject_id'])

    const classExists = await Class.findByOrFail('id', id)

    if (!data.name && !data.subject_id) throw new BadRequest('data is not provided', 422)

    if (data.name) classExists.name = data.name
    if (data.subject_id !== 0) {
      await Subject.findByOrFail('id', data.subject_id)
      classExists.subject_id = data.subject_id
    } else {
      throw new BadRequest('resource not found', 404)
    }

    await classExists.save()

    return response.ok({ class: classExists })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const classExists = await Class.findByOrFail('id', id)

    classExists.delete()

    return response.ok({})
  }

  public async listLaboratories({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const classExists = await Class.findBy('id', id)

    if (!classExists) throw new BadRequest('resource not found', 404)

    const labs = await Database.from('classes_laboratories').where('class_id', id)

    return response.ok({ laboratories: labs })
  }
}
