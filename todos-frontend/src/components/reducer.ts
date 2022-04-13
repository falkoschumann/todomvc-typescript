import { Todo, TodoId } from 'todos-contract';
import { Filter } from './constants';

export type TodosState = Readonly<{
  nowShowing: Filter;
  editing: TodoId | null;
  newTodo: string;
  todos: readonly Todo[];
  shownTodos: readonly Todo[];
  activeTodoCount: number;
  completedCount: number;
}>;

export const initialState: TodosState = {
  nowShowing: Filter.AllTodos,
  editing: null,
  newTodo: '',
  todos: [],
  shownTodos: [],
  activeTodoCount: 0,
  completedCount: 0,
};

type TodosLoadedAction = Readonly<{ type: 'TODOS_LOADED'; todos: readonly Todo[] }>;

type LocationChangedAction = Readonly<{ type: 'LOCATION_CHANGED'; pathname: string }>;

type UpdateNewTodoAction = Readonly<{ type: 'UPDATE_NEW_TODO'; text: string }>;

type TodoAddedAction = Readonly<{ type: 'TODO_ADDED'; todos: readonly Todo[] }>;

type ToggledAllAction = Readonly<{ type: 'TOGGLED_ALL'; todos: readonly Todo[] }>;

type ToggledAction = Readonly<{ type: 'TOGGLED'; todos: readonly Todo[] }>;

type DestroyedAction = Readonly<{ type: 'DESTROYED'; todos: readonly Todo[] }>;

type EditAction = Readonly<{ type: 'EDIT'; todoId: TodoId }>;

type SavedAction = Readonly<{ type: 'SAVED'; todos: readonly Todo[] }>;

type CancelAction = Readonly<{ type: 'CANCEL' }>;

type ClearedCompletedAction = Readonly<{ type: 'CLEARED_COMPLETED'; todos: readonly Todo[] }>;

export type TodosAction =
  | TodosLoadedAction
  | LocationChangedAction
  | UpdateNewTodoAction
  | TodoAddedAction
  | ToggledAllAction
  | ToggledAction
  | DestroyedAction
  | EditAction
  | SavedAction
  | CancelAction
  | ClearedCompletedAction;

export function reducer(state: TodosState, action: TodosAction): TodosState {
  switch (action.type) {
    case 'LOCATION_CHANGED': {
      const nowShowing = getShowingForPathname(action.pathname);
      return { ...state, nowShowing, ...getShownTodos(state.todos, nowShowing) };
    }
    case 'UPDATE_NEW_TODO':
      return { ...state, newTodo: action.text };
    case 'TODO_ADDED':
      return {
        ...state,
        todos: action.todos,
        newTodo: '',
        ...getShownTodos(action.todos, state.nowShowing),
      };
    case 'TODOS_LOADED':
    case 'TOGGLED_ALL':
    case 'TOGGLED':
    case 'DESTROYED':
    case 'CLEARED_COMPLETED':
      return { ...state, todos: action.todos, ...getShownTodos(action.todos, state.nowShowing) };
    case 'EDIT':
      return { ...state, editing: action.todoId };
    case 'SAVED':
      return {
        ...state,
        todos: action.todos,
        editing: null,
        ...getShownTodos(action.todos, state.nowShowing),
      };
    case 'CANCEL':
      return { ...state, editing: null };
    default:
      throw new Error('Unreachable code');
  }
}

function getShowingForPathname(pathname: string): Filter {
  switch (pathname) {
    case '/active':
      return Filter.ActiveTodos;
    case '/completed':
      return Filter.CompletedTodos;
    default:
      return Filter.AllTodos;
  }
}

function getShownTodos(todos: readonly Todo[], nowShowing: Filter) {
  const shownTodos = todos.filter((todo) => {
    switch (nowShowing) {
      case Filter.ActiveTodos:
        return !todo.completed;
      case Filter.CompletedTodos:
        return todo.completed;
      case Filter.AllTodos:
      default:
        return true;
    }
  });
  const activeTodoCount = todos.reduce((count, todo) => {
    return todo.completed ? count : count + 1;
  }, 0);
  const completedCount = todos.length - activeTodoCount;
  return { shownTodos, activeTodoCount, completedCount };
}
