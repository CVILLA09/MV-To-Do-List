// Import necessary modules and styles
import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  addTask, deleteTask, editTask, saveTasks, loadTasks,
} from './taskFunctions.js';
import { clearCompleted, updateStatus } from './statusUpdates.js';

// Load tasks from local storage
let tasks = loadTasks();

// Function to handle task editing
const handleEditTask = (event) => {
  const taskDescription = event.target;
  const listItem = taskDescription.closest('li');
  const originalText = taskDescription.textContent;

  // Change the background color to light yellow
  listItem.style.backgroundColor = 'lightyellow';

  // Make the paragraph editable and focus it
  taskDescription.contentEditable = 'true';
  taskDescription.focus();

  // When Enter is pressed, update the task description
  taskDescription.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the creation of a new line

      // Get the new description and the task index
      const newDescription = taskDescription.textContent;
      const deleteButton = listItem.querySelector('.delete-button');
      const index = parseInt(deleteButton.dataset.index, 10);

      // Update the task
      editTask(tasks, index, newDescription);
      saveTasks(tasks); // Save tasks to local storage

      // Revert the background color and make the paragraph non-editable
      listItem.style.backgroundColor = '';
      taskDescription.contentEditable = 'false';
    }

    // If the user presses Escape, cancel the edit
    if (event.key === 'Escape') {
      taskDescription.textContent = originalText;
      listItem.style.backgroundColor = '';
      taskDescription.contentEditable = 'false';
    }
  });

  // When clicking anywhere else, cancel the edit
  document.addEventListener('click', (event) => {
    if (event.target !== taskDescription) {
      taskDescription.textContent = originalText;
      listItem.style.backgroundColor = '';
      taskDescription.contentEditable = 'false';
    }
  }, { once: true });
};

// Function to print tasks to the DOM
const printTask = () => {
  const tasksContainer = document.getElementById('tasks-list');
  tasksContainer.innerHTML = ''; // Clear the tasks list

  // Sort tasks array based on index property
  tasks.sort((a, b) => a.index - b.index);

  // For each task, create a list item and append it to the tasks container
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <p class="task-description">${task.description}</p>
      <button class="delete-button" data-index="${task.index}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    tasksContainer.appendChild(listItem);

    // Add an event listener to the checkbox
    const checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      // Get the new status and the task index
      const status = checkbox.checked;
      const deleteButton = listItem.querySelector('.delete-button');
      const index = parseInt(deleteButton.dataset.index, 10);

      // Update the task status
      updateStatus(tasks, index, status);
      saveTasks(tasks); // Save tasks to local storage
    });

    // Add an event listener to the task description paragraph
    const taskDescription = listItem.querySelector('.task-description');
    taskDescription.addEventListener('click', handleEditTask);
  });

  // Add event listeners to the delete buttons
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', ({ target }) => {
      // If the target is the icon, use its parent node (the button) instead
      if (target.tagName === 'I') {
        target = target.parentNode;
      }
      const index = parseInt(target.dataset.index, 10);
      deleteTask(tasks, index); // Delete the task
      saveTasks(tasks); // Save tasks to local storage
      printTask(); // Update the tasks list
    });
  });
};

// Print tasks when the window loads
window.addEventListener('load', printTask);

// Add a new task
const taskInput = document.getElementById('task-input');
const taskSubmitButton = document.getElementById('task-submit-button');

// When the submit button is clicked, add a new task
taskSubmitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  addTask(tasks, taskInput.value); // Add the new task
  saveTasks(tasks); // Save tasks to local storage
  taskInput.value = ''; // Clear the input field
  printTask(); // Update the tasks list
});

// When the "Clear all completed" button is clicked, clear all completed tasks
const clearCompletedButton = document.getElementById('clear-completed-tasks');
clearCompletedButton.addEventListener('click', () => {
  tasks = clearCompleted(tasks);
  saveTasks(tasks); // Save tasks to local storage
  printTask(); // Update the tasks list
});