import bodyParser from 'body-parser';
import express from 'express';

import { MessageHandler } from 'todos-backend';

import { FileTodosRepository } from './adapters/FileTodosRepository';
import createTodosRouter from './routes/todos';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

const todosRepository = new FileTodosRepository();
const messageHandler = new MessageHandler(todosRepository);
app.use(createTodosRouter(messageHandler));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
