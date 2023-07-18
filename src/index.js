import './style.css';
import '@fortawesome/fontawesome-free/css/all.css';

const tasks = [
  {
    description: 'Task 1',
    completed: false,
    index: 1,
  },
  {
    description: 'Task 2',
    completed: false,
    index: 2,
  },
  {
    description: 'Task 3',
    completed: false,
    index: 3,
  },
];

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
