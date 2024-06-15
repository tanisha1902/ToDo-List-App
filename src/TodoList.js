// TodoList.js
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  // Function to remove a task
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to mark a task as completed
  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Optional: Sorting tasks alphabetically
  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.text.localeCompare(b.text));
    setTasks(sortedTasks);
  };

  // Optional: Filtering completed tasks
  const filterCompletedTasks = () => {
    const filteredTasks = tasks.filter((task) => !task.completed);
    setTasks(filteredTasks);
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add Task</button>
      <button onClick={sortTasks}> Sort Alphabetically</button>
      <button onClick={filterCompletedTasks}>   Filter Completed</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            <button onClick={() => toggleCompletion(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
