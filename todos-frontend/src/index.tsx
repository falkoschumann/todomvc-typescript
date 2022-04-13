import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { MessageHandling } from 'todos-contract';
import { LocalStorageTodosRepository, MessageHandler } from 'todos-backend';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './components/StoreProvider';

import './index.css';

const todosRepository = new LocalStorageTodosRepository();
const messageHandler: MessageHandling = new MessageHandler(todosRepository);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <StoreProvider messageHandler={messageHandler}>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
