import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // list all notes
    Route.get('/', 'NotesController.index')

    // get an note by id
    Route.get('/:id', 'NotesController.show')

    // register a new note
    Route.post('/', 'NotesController.store')

    // delete note by id
    Route.delete('/:id', 'NotesController.destroy')
  }).prefix('/notes')
}).prefix('/api')
