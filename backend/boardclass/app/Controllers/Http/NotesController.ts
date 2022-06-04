import BadRequest from 'App/Exceptions/BadRequestException'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'

export default class NotesController {
  public async index({ response }: HttpContextContract) {
    const notes = await Note.all()

    return response.ok({ notes })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const note = await Note.findByOrFail('id', id)

    return response.ok({ note })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['note', 'date'])

    if (!payload.note || !payload.date) throw new BadRequest('data is not provided', 422)

    const note = await Note.create({ note: payload.note, date: payload.date })

    return response.created({ note })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const note = await Note.findByOrFail('id', id)

    await note.delete()

    return response.ok({})
  }
}
