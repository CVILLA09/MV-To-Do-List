export const updateStatus = (tasks, index, status) => {
  // Find the task in the tasks array
  const task = tasks.find((task) => task.index === index);

  // If the task is found, update its status
  if (task) {
    task.completed = status;
  }
};

export const clearCompleted = (tasks) => tasks.filter((task) => !task.completed);
