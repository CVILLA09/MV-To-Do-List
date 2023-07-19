// Function to add a new task to the tasks array
export const addTask = (tasks, description) => {
  // Create a new task object
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };

  // Add the new task to the tasks array
  tasks.push(newTask);
};

// Function to delete a task from the tasks array
export const deleteTask = (tasks, index) => {
  // Find the index of the task in the tasks array
  const taskIndex = tasks.findIndex((task) => task.index === index);

  // If the task is found, remove it from the tasks array
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }

  // Update the index of each task
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
};

// Function to edit a task in the tasks array
export const editTask = (tasks, index, newDescription) => {
  // Find the task in the tasks array
  const task = tasks.find((task) => task.index === index);

  // If the task is found, update its description
  if (task) {
    task.description = newDescription;
  }
};

// Function to save tasks to local storage
export const saveTasks = (tasks) => {
  // Convert the tasks array to a JSON string and save it to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to load tasks from local storage
export const loadTasks = () => {
  // Get the tasks JSON string from local storage
  const tasks = localStorage.getItem('tasks');

  // If tasks are found, parse the JSON string to an array and return it
  if (tasks) {
    return JSON.parse(tasks);
  }

  // If no tasks are found, return an empty array
  return [];
};