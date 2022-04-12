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

export type ClearCompletedCommand = never;

export type SelectTodosQuery = never;

export interface SelectTodosQueryResult {
  readonly todos: Todo[];
}
