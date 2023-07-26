import { addTask, deleteTask } from './taskFunctions';
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