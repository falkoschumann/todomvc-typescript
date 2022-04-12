import { Todo, TodosRepository } from 'todos-contract';

export class LocalStorageTodosRepository implements TodosRepository {
  async loadTodos(): Promise<Todo[]> {
    const json = localStorage.getItem('todos');
    return json ? JSON.parse(json) : [];
  }

  async storeTodos(todos: Todo[]): Promise<void> {
    const json = JSON.stringify(todos);
    localStorage.setItem('todos', json);
  }
}
