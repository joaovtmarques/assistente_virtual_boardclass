import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // list all classes
    Route.get('/', 'ClassesController.index')

    // register a new class
    Route.post('/', 'ClassesController.store')

    // get an class by id
    Route.get('/:id', 'ClassesController.show')

    // update class fields
    Route.put('/:id', 'ClassesController.update')

    // delete class by id
    Route.delete('/:id', 'ClassesController.destroy')

    // list labs scheduled for class
    Route.get('/:id/laboratories', 'ClassesController.listLaboratories')
  }).prefix('/classes')
}).prefix('/api')
