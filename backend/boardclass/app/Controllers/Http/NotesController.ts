import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotesController {
  public async index({ request, response }: HttpContextContract) {
    return response.ok({})
  }

  public async store({ request, response }: HttpContextContract) {
    return response.ok({})
  }

  public async destroy({ request, response }: HttpContextContract) {
    return response.ok({})
  }
}
