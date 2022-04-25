import { Request, Response } from 'express';
import { MessageHandling } from 'todos-contract';

const CREATED = 201;
const NO_CONTENT = 204;

export class TodosController {
  constructor(private messageHandler: MessageHandling) {}

  async postTodo(req: Request, res: Response) {
    const title = String(req.body.title);
    await this.messageHandler.addTodo({ title });
    res.sendStatus(CREATED);
  }

  async getTodos(req: Request, res: Response) {
    const todos = await this.messageHandler.selectTodos({});
    res.send(todos);
  }

  async putTodo(req: Request, res: Response) {
    const todoId = Number(req.params.id);
    const newTitle = String(req.body.title);
    await this.messageHandler.save({ todoId, newTitle });
    res.sendStatus(NO_CONTENT);
  }

  async deleteTodo(req: Request, res: Response) {
    const todoId = Number(req.params.id);
    await this.messageHandler.destroy({ todoId });
    res.sendStatus(NO_CONTENT);
  }

  async postToggleTodo(req: Request, res: Response) {
    const todoId = Number(req.params.id);
    await this.messageHandler.toggle({ todoId });
    res.sendStatus(NO_CONTENT);
  }

  async postToggleAllTodos(req: Request, res: Response) {
    const checked = Boolean(req.body.checked);
    await this.messageHandler.toggleAll({ checked });
    res.sendStatus(NO_CONTENT);
  }

  async postClearCompletedTodos(req: Request, res: Response) {
    await this.messageHandler.clearCompleted({});
    res.sendStatus(NO_CONTENT);
  }
}
