import { Todo } from './data';

export interface TodosRepository {
  loadTodos(): Promise<Todo[]>;
  storeTodos(todos: Todo[]): Promise<void>;
}
