import React, { useState, useEffect } from 'react';
import './NewTaskModal.css';

const NewTaskModal = ({ task, onSave, onCancel }) => {
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [comments, setComments] = useState('');

  useEffect(() => {
    if (task) {
      setAssignedTo(task.assignedTo);
      setStatus(task.status);
      setDueDate(task.dueDate);
      setPriority(task.priority);
      setComments(task.comments);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      assignedTo,
      status,
      dueDate,
      priority,
      comments,
    };
    if (task) newTask.id = task.id;
    onSave(newTask);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Assigned To:
            <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required />
          </label>
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label>
            Due Date:
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </label>
          <label>
            Priority:
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </label>
          <label>
            Comments:
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
