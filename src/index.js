import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { addTask } from './taskFunctions.js';

const tasks = [];

const printTask = () => {
  const tasksContainer = document.getElementById('tasks-list');

  // Sort tasks array based on index property
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <p>${task.description}</p>
    `;
    tasksContainer.appendChild(listItem);
  });
};

window.addEventListener('load', printTask);

// Add a new task
addTask(tasks, 'New Task');
