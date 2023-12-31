import {
  addTask, deleteTask, saveTasks, editTask,
} from './taskFunctions.js';

describe('addTask', () => {
  test('adds a new task to the tasks array', () => {
    const tasks = [];
    addTask(tasks, 'New task');
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual({
      description: 'New task',
      completed: false,
      index: 1,
    });
  });
});

describe('deleteTask', () => {
  test('deletes a task from the tasks array', () => {
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    ];
    deleteTask(tasks, 1);
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual({ description: 'Task 2', completed: false, index: 1 });
  });
});

describe('saveTasks', () => {
  test('saves tasks to local storage', () => {
    const tasks = [{ description: 'Task 1', completed: false, index: 1 }];
    saveTasks(tasks);
    expect(localStorage.getItem('tasks')).toEqual(JSON.stringify(tasks));
  });

  test('saves different tasks to local storage', () => {
    const tasks = [{ description: 'Task 2', completed: true, index: 2 }];
    saveTasks(tasks);
    expect(localStorage.getItem('tasks')).toEqual(JSON.stringify(tasks));
  });
});

describe('editTask', () => {
  test('Edit a task\'s description', () => {
    const tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    ];
    editTask(tasks, 1, 'new description');
    expect(tasks[0].description).toBe('new description');
  });
});