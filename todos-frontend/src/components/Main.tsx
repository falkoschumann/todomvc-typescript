import { ChangeEvent } from 'react';

import { Todo, TodoId } from 'todos-contract';

import TodoListItem from './TodoListItem';

interface MainProps {
  readonly shownTodos: readonly Todo[];
  readonly todos: readonly Todo[];
  readonly editing: TodoId | null;
  readonly activeTodoCount: number;
  onToggle(todoId: TodoId): void;
  onDestroy(todoId: TodoId): void;
  onEdit(todoId: TodoId): void;
  onSave(todoId: TodoId, newTitle: string): void;
  onCancel(): void;
  onToggleAll(checked: boolean): void;
}

function Main({
  shownTodos,
  todos,
  editing,
  activeTodoCount,
  onToggle,
  onDestroy,
  onEdit,
  onSave,
  onCancel,
  onToggleAll,
}: MainProps) {
  if (todos.length === 0) {
    return null;
  }

  function handleToggleAll(event: ChangeEvent<HTMLInputElement>) {
    onToggleAll(event.target.checked);
  }

  const todoItems = shownTodos.map((todo) => (
    <TodoListItem
      key={todo.id}
      todo={todo}
      onToggle={() => onToggle(todo.id)}
      onDestroy={() => onDestroy(todo.id)}
      onEdit={() => onEdit(todo.id)}
      editing={editing === todo.id}
      onSave={(newTitle) => onSave(todo.id, newTitle)}
      onCancel={onCancel}
    />
  ));

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={handleToggleAll}
        checked={activeTodoCount === 0}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">{todoItems}</ul>
    </section>
  );
}

export default Main;
