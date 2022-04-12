import { Todo, TodosRepository } from 'todos-contract';

export class MemoryTodosRepository implements TodosRepository {
  private todos: Todo[] = [];

  async loadTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async storeTodos(todos: Todo[]): Promise<void> {
    this.todos = todos;
  }
}
