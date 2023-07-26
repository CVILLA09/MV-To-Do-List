 
First, let's install Jest and set up the testing environment:

1. Open your terminal and navigate to your project directory.

2. Install Jest as a devDependency by running the following command:

```bash
npm install --save-dev jest
```

3. In your `package.json` file, add the following section:

```json
"scripts": {
    "test": "jest"
}
```

4. Create a `babel.config.js` file in your root directory and add the following code to it:

```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
  ],
};
```

5. Install `@babel/preset-env` and `babel-jest` by running the following command:

```bash
npm install --save-dev @babel/preset-env babel-jest
```

Now, let's write tests for your `addTask` and `deleteTask` functions. 

1. Create a new file named `taskFunctions.test.js` in the same directory as your `taskFunctions.js` file.

2. In `taskFunctions.test.js`, import the functions you want to test:

```javascript
import { addTask, deleteTask } from './taskFunctions';
```

3. Write a test for the `addTask` function:

```javascript
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
```

4. Write a test for the `deleteTask` function:

```javascript
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
```

5. Run your tests by executing the following command in your terminal:

```bash
npm test
```

You should see a message indicating that your tests passed.

Next, let's mock localStorage and the DOM to test functions that interact with them. 

1. At the top of your `taskFunctions.test.js` file, add the following code to mock localStorage:

```javascript
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});
```

2. To mock the DOM, you can use Jest's `jsdom` environment, which simulates a DOM environment as if you were in the browser. This is automatically set up in Jest. You can create elements and interact with them as you would in a browser. For example:

```javascript
const div = document.createElement('div');
div.innerHTML = 'Hello, world!';
document.body.appendChild(div);
expect(document.body.textContent).toBe('Hello, world!');
```

3. Now you can write tests for functions that interact with localStorage and the DOM. Remember to clear your mocks after each test using `jest.clearAllMocks()`.

4. Finally, to check your test coverage, add the `--coverage` flag to your test script in `package.json`:

```json
"scripts": {
    "test": "jest --coverage"
}
```

5. Run your tests again with `npm test`. You should see a coverage report in your terminal.

Remember to write tests for all edge cases and possible inputs, not just the "happy path". This will help ensure your functions are robust and handle all possible scenarios. Good luck!