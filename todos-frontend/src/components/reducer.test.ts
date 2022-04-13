import { Filter } from './constants';
import { initialState, reducer, TodosState } from './reducer';

describe('Location changed', () => {
  it('now showing all todo', () => {
    let state: TodosState = {
      ...initialState,
      nowShowing: Filter.ActiveTodos,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    state = reducer(state, { type: 'LOCATION_CHANGED', pathname: '/' });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });

  it('now showing active todo', () => {
    let state: TodosState = {
      ...initialState,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    state = reducer(state, { type: 'LOCATION_CHANGED', pathname: '/active' });

    expect(state).toEqual({
      nowShowing: Filter.ActiveTodos,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [{ id: 2, title: 'Buy a Unicorn', completed: false }],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });

  it('now showing completed todo', () => {
    let state: TodosState = {
      ...initialState,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    state = reducer(state, { type: 'LOCATION_CHANGED', pathname: '/completed' });

    expect(state).toEqual({
      nowShowing: Filter.CompletedTodos,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Todos loaded', () => {
  it('updates todo', () => {
    const state = reducer(initialState, {
      type: 'TODOS_LOADED',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Update new todo', () => {
  it('updates new todos text', () => {
    const state = reducer(initialState, { type: 'UPDATE_NEW_TODO', text: 'Taste JavaScript' });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: 'Taste JavaScript',
      todos: [],
      shownTodos: [],
      activeTodoCount: 0,
      completedCount: 0,
    });
  });
});

describe('Todo added', () => {
  it('clears new todo text and updates todos', () => {
    let state: TodosState = {
      ...initialState,
      newTodo: 'Buy a Unicorn',
      todos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
    };
    state = reducer(state, {
      type: 'TODO_ADDED',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Toggled all', () => {
  it('updates todos', () => {
    const state = reducer(initialState, {
      type: 'TOGGLED_ALL',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: true },
      ],
    });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: true },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: true },
      ],
      activeTodoCount: 0,
      completedCount: 2,
    });
  });
});

describe('Toggled', () => {
  it('updates todos', () => {
    const state = reducer(initialState, {
      type: 'TOGGLED',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Destroyed', () => {
  it('updates todos', () => {
    const state = reducer(initialState, {
      type: 'DESTROYED',
      todos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
    });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: '',
      todos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
      shownTodos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
      activeTodoCount: 0,
      completedCount: 1,
    });
  });
});

describe('Edit', () => {
  it('remembers editing todo', () => {
    let state: TodosState = {
      ...initialState,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    };
    state = reducer(state, { type: 'EDIT', todoId: 1 });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: 1,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Saved', () => {
  it('clears editing todo and updates todos', () => {
    let state: TodosState = {
      ...initialState,
      editing: 1,
    };
    state = reducer(state, {
      type: 'SAVED',
      todos: [
        { id: 1, title: 'Taste TypeScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste TypeScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste TypeScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Cancel', () => {
  it('clears editing todo', () => {
    let state: TodosState = {
      ...initialState,
      editing: 1,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    };
    state = reducer(state, { type: 'CANCEL' });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Cleared completed', () => {
  it('updates todos', () => {
    const state = reducer(initialState, {
      type: 'CLEARED_COMPLETED',
      todos: [{ id: 2, title: 'Buy a Unicorn', completed: false }],
    });

    expect(state).toEqual({
      nowShowing: Filter.AllTodos,
      editing: null,
      newTodo: '',
      todos: [{ id: 2, title: 'Buy a Unicorn', completed: false }],
      shownTodos: [{ id: 2, title: 'Buy a Unicorn', completed: false }],
      activeTodoCount: 1,
      completedCount: 0,
    });
  });
});
