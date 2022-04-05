import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // list all laboratory
    Route.get('/', 'LaboratoriesController.index')

    // register a new laboratory (adm)
    Route.post('/', 'LaboratoriesController.store')

    // get an laboratory by name
    Route.get('/:name', 'LaboratoriesController.show')

    // update laboratory fields (adm)
    Route.put('/:id', 'LaboratoriesController.update')

    // delete laboratory by id (adm)
    Route.delete('/:id', 'LaboratoriesController.destroy')

    // schedule a laboratory
    Route.post('/schedule', 'LaboratoriesController.scheduleLaboratory')
  }).prefix('/laboratories')
}).prefix('/api')
