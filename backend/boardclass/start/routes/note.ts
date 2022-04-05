import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // list all notes
    Route.get('/', 'NotesController.index')

    // register a new note
    Route.post('/', 'NotesController.store')

    // delete note by id
    Route.delete('/:id', 'NotesController.destroy')
  }).prefix('/notes')
}).prefix('/api')
