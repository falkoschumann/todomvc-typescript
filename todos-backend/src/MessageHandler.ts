import {
  AddTodoCommand,
  DestroyCommand,
  MessageHandling,
  SaveCommand,
  SelectTodosQueryResult,
  TodosRepository,
  ToggleAllCommand,
  ToggleCommand,
} from 'todos-contract';

export class MessageHandler implements MessageHandling {
  constructor(private todosRepository: TodosRepository) {}
  async addTodo(command: AddTodoCommand): Promise<void> {
    if (!command.title) {
      return;
    }

    let todos = await this.todosRepository.loadTodos();
    let id = todos.map((todo) => todo.id).reduce((id1, id2) => Math.max(id1, id2), 0);
    id++;
    const newTodo = { id, title: command.title, completed: false };
    todos = [...todos, newTodo];
    await this.todosRepository.storeTodos(todos);
  }

  async toggleAll(command: ToggleAllCommand): Promise<void> {
    let todos = await this.todosRepository.loadTodos();
    todos = todos.map((todo) => ({ ...todo, completed: command.checked }));
    await this.todosRepository.storeTodos(todos);
  }

  async toggle(command: ToggleCommand): Promise<void> {
    let todos = await this.todosRepository.loadTodos();
    todos = todos.map((todo) =>
      todo.id === command.todoId ? { ...todo, completed: !todo.completed } : todo
    );
    await this.todosRepository.storeTodos(todos);
  }

  async destroy(command: DestroyCommand): Promise<void> {
    let todos = await this.todosRepository.loadTodos();
    todos = todos.filter((todo) => todo.id !== command.todoId);
    await this.todosRepository.storeTodos(todos);
  }

  async save(command: SaveCommand): Promise<void> {
    let todos = await this.todosRepository.loadTodos();
    todos = todos.map((todo) =>
      todo.id === command.todoId ? { ...todo, title: command.newTitle } : todo
    );
    await this.todosRepository.storeTodos(todos);
  }

  async clearCompleted(): Promise<void> {
    let todos = await this.todosRepository.loadTodos();
    todos = todos.filter((todo) => !todo.completed);
    await this.todosRepository.storeTodos(todos);
  }

  async selectTodos(): Promise<SelectTodosQueryResult> {
    const todos = await this.todosRepository.loadTodos();
    return { todos: [...todos] };
  }
}
