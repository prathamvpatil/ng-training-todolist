

export const TaskService = {
  addTask: async (task) => {
    const response = await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return response.json();
  },
  getTasks: async () => {
    const response = await fetch('http://localhost:4000/api/tasks');
    return response.json();
  },
  deleteTask: async (taskId) => {
    await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },
  updateTask: async (taskId, updatedTask) => {
    const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    return response.json();
  },
};

