import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // list all evaluations
    Route.get('/', 'EvaluationsController.index')

    // register a new evaluation
    Route.post('/', 'EvaluationsController.store')

    // delete evaluation by id
    Route.delete('/:id', 'EvaluationsController.destroy')
  }).prefix('/evaluations')
}).prefix('/api')
