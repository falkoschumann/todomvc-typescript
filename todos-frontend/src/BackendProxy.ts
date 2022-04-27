import { AddTodoCommand, ClearCompletedCommand, DestroyCommand, MessageHandling, SaveCommand, SelectTodosQuery, SelectTodosQueryResult, ToggleAllCommand, ToggleCommand } from "todos-contract";
import { TodosApi } from "./api/TodosApi";

export class BackendProxy implements MessageHandling {
  private todosApi = new TodosApi();

  addTodo(command: AddTodoCommand): Promise<void> {
    return this.todosApi.addTodo(command.title);
  }
  toggleAll(command: ToggleAllCommand): Promise<void> {
    return this.todosApi.toggleAll(command.checked);
  }
  toggle(command: ToggleCommand): Promise<void> {
    return this.todosApi.toggle(command.todoId);
  }
  destroy(command: DestroyCommand): Promise<void> {
    return this.todosApi.destroy(command.todoId);
  }
  save(command: SaveCommand): Promise<void> {
    return this.todosApi.save(command.todoId, command.newTitle);
  }
  clearCompleted(command: ClearCompletedCommand): Promise<void> {
    return this.todosApi.clearCompleted();
  }
  selectTodos(query: SelectTodosQuery): Promise<SelectTodosQueryResult> {
    return this.todosApi.selectTodos();
  }
}
