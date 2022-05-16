import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'
import Student from 'App/Models/Student'

import BadRequest from 'App/Exceptions/BadRequestException'

import CreateStudentValidator from 'App/Validators/CreateStudentValidator'
import UpdateStudentValidator from 'App/Validators/UpdateStudentValidator'

export default class StudentsController {
  public async index({ response }: HttpContextContract) {
    const students = await Student.all()

    return response.ok({ students })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateStudentValidator)

    await Class.findByOrFail('id', payload.class_id)

    const raExists = await Student.findBy('ra', payload.ra)

    if (raExists) {
      throw new BadRequest('ra already exists', 409)
    }

    const student = await Student.create(payload)
    await student.related('class').attach([payload.class_id])

    return response.created({ student })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const student = await Student.findByOrFail('id', id)

    return response.ok({ student })
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const data = await request.validate(UpdateStudentValidator)

    const student = await Student.findByOrFail('id', id)

    if (!data.name && !data.ra && !data.class_id) throw new BadRequest('data is not provided', 422)

    if (data.name) student.name = data.name
    if (data.class_id) {
      await Class.findByOrFail('id', data.class_id)
      student.class_id = data.class_id
    } else if (data.ra) {
      student.ra = data.ra
    }

    await student.save()

    return response.ok({ student })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const student = await Student.findByOrFail('id', id)

    await student.delete()

    return response.ok({})
  }
}
