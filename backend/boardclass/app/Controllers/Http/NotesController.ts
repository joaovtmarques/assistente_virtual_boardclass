import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotesController {
  public async index({ response }: HttpContextContract) {
    return response.ok({})
  }

  public async store({ response }: HttpContextContract) {
    return response.ok({})
  }

  public async destroy({ response }: HttpContextContract) {
    return response.ok({})
  }
}
