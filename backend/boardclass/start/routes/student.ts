import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // list all students
    Route.get('/', 'StudentsController.index')

    // register a new student
    Route.post('/', 'StudentsController.store')

    // get an student by name
    Route.get('/:name', 'StudentsController.show')

    // update student fields
    Route.put('/:id', 'StudentsController.update')

    // delete student by id
    Route.delete('/:id', 'StudentsController.destroy')
  }).prefix('/students')
}).prefix('/api')
