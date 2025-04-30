const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let tasks = require('./tasks.json'); // Load tasks from JSON file
let nextId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

// Write tasks to the JSON file
const writeTasksToFile = () => {
  fs.writeFileSync('./tasks.json', JSON.stringify(tasks, null, 2));
};

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const task = { id: nextId++, ...req.body };
  tasks.push(task);
  writeTasksToFile();
  res.status(201).json(task);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex !== -1) {
    tasks[taskIndex] = { id: taskId, ...req.body };
    writeTasksToFile();
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  tasks = tasks.filter(t => t.id !== taskId);
  writeTasksToFile();
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
