import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TaskList.css';
import './toastify.css';
import { TaskService } from '../services/TaskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTask, setNewTask] = useState({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const tasksPerPage = 6;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await TaskService.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        toast.error('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const filteredTasks = tasks.filter(task =>
    task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      toast.info(`Navigated to page ${currentPage + 1}`);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      toast.info(`Navigated to page ${currentPage - 1}`);
    }
  };

  const handleFirst = () => {
    setCurrentPage(1);
    toast.info('Navigated to first page');
  };

  const handleLast = () => {
    setCurrentPage(totalPages);
    toast.info('Navigated to last page');
  };

  const openModal = (task = null) => {
    if (task) {
      setIsEditMode(true);
      setEditTaskId(task.id);
      setNewTask(task); // Fill the modal with the task details
    } else {
      setIsEditMode(false);
      setNewTask({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setNewTask({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleAddOrUpdateTask = async () => {
    try {
      if (isEditMode) {
        const updatedTask = await TaskService.updateTask(editTaskId, newTask);
        setTasks(tasks.map(task => (task.id === editTaskId ? updatedTask : task))); // Update local state
        toast.success('Task updated successfully');
      } else {
        const addedTask = await TaskService.addTask(newTask);
        setTasks(prevTasks => [...prevTasks, addedTask]); // Update local state
        toast.success('Task added successfully');
      }
      closeModal();
    } catch (error) {
      toast.error(isEditMode ? 'Failed to update task' : 'Failed to add task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      toast.error('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleRefresh = async () => {
    try {
      const fetchedTasks = await TaskService.getTasks();
      setTasks(fetchedTasks);
      toast.info('Task list refreshed');
    } catch (error) {
      toast.error('Failed to refresh tasks');
    }
  };

  return (
    <div className="task-list">
      <ToastContainer />
      <h2>Task List</h2>
      <div className="task-list-header">
        <button style={{ marginRight: '10px', marginBottom: '10px' }} className="new-task-button" onClick={() => openModal()}>
          New Task
        </button>
        <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
        <input
          type="text"
          className="search-input"
          placeholder="Search by Assigned To"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <button style={{ marginRight: '10px', marginBottom: '10px' }} onClick={() => openModal(task)}>Edit</button>
                <button style={{ marginRight: '10px', marginBottom: '10px' }} onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={handleFirst} disabled={currentPage === 1}>First</button>
        <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        <button onClick={handleLast} disabled={currentPage === totalPages}>Last</button>
      </div>

      {/* Modal for adding or editing a task */}
      {isModalOpen && (
        <div className="modal">
          <h3>{isEditMode ? 'Edit Task' : 'Add New Task'}</h3>
          <input type="text" name="assignedTo" placeholder="Assigned To" value={newTask.assignedTo} onChange={handleInputChange} />
          <input type="text" name="status" placeholder="Status" value={newTask.status} onChange={handleInputChange} />
          <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleInputChange} />
          <input type="text" name="priority" placeholder="Priority" value={newTask.priority} onChange={handleInputChange} />
          <input type="text" name="comments" placeholder="Comments" value={newTask.comments} onChange={handleInputChange} />
          <button onClick={handleAddOrUpdateTask}>{isEditMode ? 'Update Task' : 'Add Task'}</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;