import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { addTask, saveTasks, loadTasks } from './taskFunctions.js';

let tasks = loadTasks();

const printTask = () => {
  const tasksContainer = document.getElementById('tasks-list');
  tasksContainer.innerHTML = ''; // Clear the tasks list

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
saveTasks(tasks); // Save tasks to local storage

// Reload tasks from local storage and update the DOM
tasks = loadTasks();
printTask();