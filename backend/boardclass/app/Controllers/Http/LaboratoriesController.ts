import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LaboratoriesController {
  public async index({ response }: HttpContextContract) {
    return response.ok({})
  }

  public async store({ response }: HttpContextContract) {
    return response.ok({})
  }

  public async show({ response }: HttpContextContract) {
    return response.ok({})
  }

  public async update({ response }: HttpContextContract) {
    return response.ok({})
  }

  public async destroy({ response }: HttpContextContract) {
    return response.ok({})
  }

  public async scheduleLaboratory({ response }: HttpContextContract) {
    return response.ok({})
  }
}
