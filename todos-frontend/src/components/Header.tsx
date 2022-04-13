import { ChangeEvent, KeyboardEvent } from 'react';

interface HeaderProps {
  readonly newTodo: string;
  onUpdateNewTodo(text: string): void;
  onAddTodo(text: string): void;
}

function Header({ newTodo, onUpdateNewTodo, onAddTodo }: HeaderProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onUpdateNewTodo(event.target.value);
  }

  function handleNewTodoKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code !== 'Enter') {
      return;
    }

    event.preventDefault();

    const text = newTodo.trim();
    if (!text) {
      return;
    }

    onAddTodo(text);
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onKeyDown={handleNewTodoKeyDown}
        onChange={handleChange}
        autoFocus
      />
    </header>
  );
}

export default Header;
