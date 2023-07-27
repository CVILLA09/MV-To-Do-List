// statusUpdate test

import { updateStatus, clearCompleted } from './statusUpdates.js';

describe('updateStatus', () => {
  test('updates a task\'s status', () => {
    const tasks = [
      { description: 'task1 ', completed: false, index: 1 },
      { description: 'task2 ', completed: true, index: 2 },
    ];
    updateStatus(tasks, true, 1);
    expect(tasks[0].completed).toBe(false);
  });
});

describe('clearCompleted', () => {
  test('Clears all completed tasks', () => {
    const tasks = [
      { description: 'Task 1', completed: true, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    ];
    const result = clearCompleted(tasks);
    expect(result).toEqual([{ description: 'Task 2', completed: false, index: 2 }]);
  });
});
