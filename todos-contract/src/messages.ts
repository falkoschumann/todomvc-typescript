import { Todo } from './data';

export interface AddTodoCommand {
  readonly title: string;
}

export interface ToggleAllCommand {
  readonly checked: boolean;
}

export interface ToggleCommand {
  readonly todoId: number;
}

export interface DestroyCommand {
  readonly todoId: number;
}

export interface SaveCommand {
  readonly todoId: number;
  readonly newTitle: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClearCompletedCommand {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectTodosQuery {}

export interface SelectTodosQueryResult {
  readonly todos: readonly Todo[];
}
