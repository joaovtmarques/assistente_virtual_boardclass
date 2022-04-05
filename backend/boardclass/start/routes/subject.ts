import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // list all subjects
    Route.get('/', 'SubjectsController.index')

    // register a new subject
    Route.post('/', 'SubjectsController.store')

    // get an subject by name
    Route.get('/:name', 'SubjectsController.show')

    // delete student by id
    Route.get('/:id', 'SubjectsController.destroy')
  }).prefix('/subjects')
}).prefix('/api')
