import fs from 'fs';
import path from 'path';

import { Todo, TodosRepository } from 'todos-contract';

export class FileTodosRepository implements TodosRepository {
  constructor(private file = './data/todos.json') {}

  async loadTodos(): Promise<Todo[]> {
    if (!fs.existsSync(this.file)) {
      return [];
    }

    const json = fs.readFileSync(this.file, 'utf8');
    return JSON.parse(json);
  }

  async storeTodos(todos: Todo[]): Promise<void> {
    const dir = path.dirname(this.file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const json = JSON.stringify(todos);
    fs.writeFileSync(this.file, json, 'utf8');
  }
}
