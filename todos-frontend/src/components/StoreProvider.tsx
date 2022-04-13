import { createContext, ReactNode, useCallback, useContext, useEffect, useReducer } from 'react';
import { MessageHandling, TodoId } from 'todos-contract';

import { initialState, reducer } from './reducer';

const StoreContext = createContext({
  ...initialState,
  onLocationChanged: (pathname: string) => {},
  onUpdateNewTodo: (text: string) => {},
  onAddTodo: (text: string) => {},
  onToggleAll: (checked: boolean) => {},
  onToggle: (todoId: TodoId) => {},
  onDestroy: (todoId: TodoId) => {},
  onEdit: (todoId: TodoId) => {},
  onSave: (todoId: TodoId, newTitle: string) => {},
  onCancel: () => {},
  onClearCompleted: () => {},
});

interface StoreProviderProps {
  readonly messageHandler: MessageHandling;
  readonly children: ReactNode;
}

export function StoreProvider({ messageHandler, children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadTodos() {
      const { todos } = await messageHandler.selectTodos({});
      dispatch({ type: 'TODOS_LOADED', todos });
    }

    loadTodos();
  }, [messageHandler]);

  const onLocationChanged = useCallback((pathname: string) => {
    dispatch({ type: 'LOCATION_CHANGED', pathname });
  }, []);

  const onUpdateNewTodo = useCallback((text: string) => {
    dispatch({ type: 'UPDATE_NEW_TODO', text });
  }, []);

  const onAddTodo = useCallback(
    async (title: string) => {
      await messageHandler.addTodo({ title });
      const { todos } = await messageHandler.selectTodos({});
      dispatch({ type: 'TODO_ADDED', todos });
    },
    [messageHandler]
  );

  const onToggleAll = useCallback(
    async (checked: boolean) => {
      await messageHandler.toggleAll({ checked });
      const { todos } = await messageHandler.selectTodos({});
      dispatch({ type: 'TOGGLED_ALL', todos });
    },
    [messageHandler]
  );

  const onToggle = useCallback(
    async (todoId: TodoId) => {
      await messageHandler.toggle({ todoId });
      const { todos } = await messageHandler.selectTodos({});
      dispatch({ type: 'TOGGLED', todos });
    },
    [messageHandler]
  );

  const onDestroy = useCallback(
    async (todoId: TodoId) => {
      await messageHandler.destroy({ todoId });
      const { todos } = await messageHandler.selectTodos({});
      dispatch({ type: 'DESTROYED', todos });
    },
    [messageHandler]
  );

  const onEdit = useCallback((todoId: TodoId) => {
    dispatch({ type: 'EDIT', todoId });
  }, []);

  const onSave = useCallback(
    async (todoId: TodoId, newTitle: string) => {
      await messageHandler.save({ todoId, newTitle });
      const { todos } = await messageHandler.selectTodos({});
      dispatch({ type: 'SAVED', todos });
    },
    [messageHandler]
  );

  const onCancel = useCallback(() => {
    dispatch({ type: 'CANCEL' });
  }, []);

  const onClearCompleted = useCallback(async () => {
    await messageHandler.clearCompleted({});
    const { todos } = await messageHandler.selectTodos({});
    dispatch({ type: 'CLEARED_COMPLETED', todos });
  }, [messageHandler]);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        onLocationChanged,
        onUpdateNewTodo,
        onAddTodo,
        onToggleAll,
        onToggle,
        onDestroy,
        onEdit,
        onSave,
        onCancel,
        onClearCompleted,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
