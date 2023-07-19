export const addTask = (tasks, description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };

  tasks.push(newTask);
};

export const deleteTask = (tasks, index) => {
  const taskIndex = tasks.findIndex((task) => task.index === index);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }

  // Update the index of each task
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
};