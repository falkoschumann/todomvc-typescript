import { TodoId } from 'todos-contract';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export class TodosApi {
  async addTodo(title: string) {
    await fetch('/api/todos', {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ title }),
    });
  }

  async toggleAll(checked: boolean) {
    await fetch('/api/todos/toggle-all', {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ checked }),
    });
  }

  async toggle(todoId: TodoId) {
    await fetch(`/api/todos/${todoId}/toggle`, {
      method: 'POST',
      body: '',
    });
  }

  async destroy(todoId: TodoId) {
    await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE',
    });
  }
  async save(todoId: TodoId, newTitle: string) {
    await fetch(`/api/todos/${todoId}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ title: newTitle }),
    });
  }

  async clearCompleted() {
    await fetch('/api/todos/clear-completed', {
      method: 'POST',
      body: '',
    });
  }

  async selectTodos() {
    const response = await fetch('/api/todos');
    return response.json();
  }
}
