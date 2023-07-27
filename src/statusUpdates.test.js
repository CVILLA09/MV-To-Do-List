//statusUpdate test

import { updateStatus, clearCompleted } from './statusUpdates.js';

describe('updateStatus', () => {
  test('updates a task\'s status', () => {
    const tasks=[ 
      {description: "task1 ", completed:false , index:1},
      {description: "task2 ", completed:true , index:2}
    ];
updateStatus(tasks,true,1);
expect(tasks[0].completed).toBe(false);
  })
});




