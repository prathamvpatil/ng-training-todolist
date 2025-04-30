import { TaskService } from '../services/TaskService';
import { expect } from 'chai';

describe('TaskService', () => {
  it('should add a new task', async () => {
    const task = 'New Task';
    const result = await TaskService.addTask(task);
    expect(result).to.be.true;
  });

  it('should delete a task', async () => {
    const taskId = 1;
    const result = await TaskService.deleteTask(taskId);
    expect(result).to.be.true;
  });
});
