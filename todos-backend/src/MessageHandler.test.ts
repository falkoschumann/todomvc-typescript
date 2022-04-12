import { MemoryTodosRepository } from './adapters/MemoryTodosRepository';
import { MessageHandler } from './MessageHandler';
import { TodosRepository } from 'todos-contract';

describe('Add todo', () => {
  let todosRepository: TodosRepository;
  let messageHandler: MessageHandler;
  beforeEach(async () => {
    todosRepository = new MemoryTodosRepository();
    await todosRepository.storeTodos([{ id: 1, title: 'Taste JavaScript', completed: true }]);
    messageHandler = new MessageHandler(todosRepository);
  });

  it('saves new todo and return it with created id', async () => {
    await messageHandler.addTodo({ title: 'Buy a Unicorn' });

    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('does nothing if title is empty', async () => {
    await messageHandler.addTodo({ title: '' });

    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });
});

describe('Toggle all', () => {
  let todosRepository: TodosRepository;
  let messageHandler: MessageHandler;
  beforeEach(async () => {
    todosRepository = new MemoryTodosRepository();
    await todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
    messageHandler = new MessageHandler(todosRepository);
  });

  it('set all todos completed', async () => {
    await messageHandler.toggleAll({ checked: true });

    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('set all todos active', async () => {
    await messageHandler.toggleAll({ checked: false });

    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Toggle', () => {
  let todosRepository: TodosRepository;
  let messageHandler: MessageHandler;
  beforeEach(async () => {
    todosRepository = new MemoryTodosRepository();
    await todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
    messageHandler = new MessageHandler(todosRepository);
  });

  it('marks the todo as completed', async () => {
    await messageHandler.toggle({ todoId: 2 });

    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('marks the todo as active', async () => {
    await messageHandler.toggle({ todoId: 1 });

    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Destroy', () => {
  let todosRepository: TodosRepository;
  let messageHandler: MessageHandler;
  beforeEach(async () => {
    todosRepository = new MemoryTodosRepository();
    await todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
    messageHandler = new MessageHandler(todosRepository);
  });

  it('removes the todo', async () => {
    await messageHandler.destroy({ todoId: 1 });

    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});

describe('Save', () => {
  let todosRepository: TodosRepository;
  let messageHandler: MessageHandler;
  beforeEach(async () => {
    todosRepository = new MemoryTodosRepository();
    await todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
    messageHandler = new MessageHandler(todosRepository);
  });

  it('changes the todos title', async () => {
    await messageHandler.save({ todoId: 1, newTitle: 'Taste TypeScript' });

    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste TypeScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Clear completed', () => {
  let todosRepository: TodosRepository;
  let messageHandler: MessageHandler;
  beforeEach(async () => {
    todosRepository = new MemoryTodosRepository();
    await todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
    messageHandler = new MessageHandler(todosRepository);
  });

  it('removes completed todos', async () => {
    await messageHandler.clearCompleted();

    const todos = await todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});

describe('Select todos', () => {
  let todosRepository: TodosRepository;
  let messageHandler: MessageHandler;
  beforeEach(async () => {
    todosRepository = new MemoryTodosRepository();
    await todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
    messageHandler = new MessageHandler(todosRepository);
  });

  it('selected all todos', async () => {
    const todos = await messageHandler.selectTodos();

    expect(todos).toEqual({
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    });
  });
});
