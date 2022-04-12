import {
  AddTodoCommand,
  ClearCompletedCommand,
  DestroyCommand,
  SaveCommand,
  SelectTodosQuery,
  SelectTodosQueryResult,
  ToggleAllCommand,
  ToggleCommand,
} from './messages';

export interface MessageHandling {
  addTodo(command: AddTodoCommand): Promise<void>;
  toggleAll(command: ToggleAllCommand): Promise<void>;
  toggle(command: ToggleCommand): Promise<void>;
  destroy(command: DestroyCommand): Promise<void>;
  save(command: SaveCommand): Promise<void>;
  clearCompleted(command: ClearCompletedCommand): Promise<void>;
  selectTodos(query: SelectTodosQuery): Promise<SelectTodosQueryResult>;
}
