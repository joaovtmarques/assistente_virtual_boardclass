import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // list all laboratories
    Route.get('/', 'LaboratoriesController.index')

    // register a new laboratory (adm)
    Route.post('/', 'LaboratoriesController.store')

    // get an laboratory by id
    Route.get('/:id', 'LaboratoriesController.show')

    // schedule a laboratory
    Route.post('/schedule', 'LaboratoriesController.scheduleLaboratory')
  }).prefix('/laboratories')
}).prefix('/api')
