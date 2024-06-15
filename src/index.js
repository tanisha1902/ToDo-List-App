// index.js
import React from 'react';
import { render } from 'react-dom';
import TodoList from './TodoList';
import './styles.css';

const App = () => (
  <div className="app">
    <TodoList />
  </div>
);

render(<App />, document.getElementById('root'));
