import React, { useState } from 'react';
import TaskList from './components/TaskList';
import NewTaskModal from './components/NewTaskModal';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '12/10/2024', priority: 'Low', comments: 'This task is good' },
    { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '14/09/2024', priority: 'High', comments: 'This task is okay' },
    // Add more tasks as needed
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

  const editTask = (taskToEdit) => {
    setCurrentTask(taskToEdit);
    setIsModalOpen(true);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setIsModalOpen(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleRefresh = () => {
    // Logic to refresh the tasks (if fetching from API or similar)
    console.log("Tasks refreshed");
  };

  return (
    <div className="App">
      <TaskList 
        tasks={tasks} 
        onEdit={editTask} 
        onDelete={deleteTask} 
        onRefresh={handleRefresh} 
        openNewTaskModal={() => setIsModalOpen(true)} // Use this prop to handle modal opening
      />
      {isModalOpen && (
        <NewTaskModal
          task={currentTask}
          onSave={(newTask) => {
            if (currentTask) {
              updateTask(newTask);
            } else {
              addTask(newTask);
            }
            setIsModalOpen(false);
            setCurrentTask(null);
          }}
          onCancel={() => {
            setIsModalOpen(false);
            setCurrentTask(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
