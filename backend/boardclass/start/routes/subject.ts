import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // list all subjects
    Route.get('/', 'SubjectsController.index')

    // register a new subject
    Route.post('/', 'SubjectsController.store')

    // get an subject by id
    Route.get('/:id', 'SubjectsController.show')

    // delete student by id
    Route.delete('/:id', 'SubjectsController.destroy')
  }).prefix('/subjects')
}).prefix('/api')
