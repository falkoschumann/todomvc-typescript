import express from 'express';

import { MessageHandling } from 'todos-contract';

import { TodosController } from '../controllers/todos';

function createRouter(messageHandler: MessageHandling) {
  const todosController = new TodosController(messageHandler);
  const router = express.Router();
  router.post('/api/todos', (req, res) => todosController.postTodo(req, res));
  router.get('/api/todos', (req, res) => todosController.getTodos(req, res));
  router.put('/api/todos/:id', (req, res) => todosController.putTodo(req, res));
  router.delete('/api/todos/:id', (req, res) => todosController.deleteTodo(req, res));
  router.post('/api/todos/:id/toggle', (req, res) => todosController.postToggleTodo(req, res));
  router.post('/api/todos/toggle-all', (req, res) => todosController.postToggleAllTodos(req, res));
  router.post('/api/todos/clear-completed', (req, res) =>
    todosController.postClearCompletedTodos(req, res)
  );
  return router;
}

export default createRouter;
