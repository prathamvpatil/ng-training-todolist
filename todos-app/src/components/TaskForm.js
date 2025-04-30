import React, { useState } from 'react';

const TaskForm = ({ saveTask, cancelTask }) => {
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTask({ assignedTo, status, dueDate, priority, comments });
  };

  return (
    <div className="task-form-container">
      <h2>New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Assigned To:
          <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)} required>
            <option value="">Select a user</option>
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
            <option value="User 3">User 3</option>
            <option value="User 4">User 4</option>
          </select>
        </label>

        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)} required>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            required
          />
        </label>

        <label>
          Priority:
          <select value={priority} onChange={e => setPriority(e.target.value)} required>
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Description:
          <input
            type="text"
            value={comments}
            onChange={e => setComments(e.target.value)}
            placeholder="Enter comments"
          />
        </label>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={cancelTask}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
