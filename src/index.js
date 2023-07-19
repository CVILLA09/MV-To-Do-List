import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { addTask, deleteTask, saveTasks, loadTasks } from './taskFunctions.js';

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
      <button class="delete-button" data-index="${task.index}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    tasksContainer.appendChild(listItem);
  });

  // Add event listeners to the delete buttons
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let target = event.target;
      // If the target is the icon, use its parent node (the button) instead
      if (target.tagName === 'I') {
        target = target.parentNode;
      }
      const index = parseInt(target.dataset.index, 10);
      deleteTask(tasks, index);
      saveTasks(tasks); // Save tasks to local storage
      printTask(); // Update the tasks list
    });
  });
};

window.addEventListener('load', printTask);

// Add a new task
const taskInput = document.getElementById('task-input');
const taskSubmitButton = document.getElementById('task-submit-button');

taskSubmitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  addTask(tasks, taskInput.value);
  saveTasks(tasks); // Save tasks to local storage
  taskInput.value = ''; // Clear the input field
  printTask(); // Update the tasks list
});