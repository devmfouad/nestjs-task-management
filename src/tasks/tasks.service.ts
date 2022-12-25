import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTasksDto } from './dto/search-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  searchTasks(searchTaskDto: SearchTasksDto): Task[] {
    let tasks = this.getAllTasks();
    const { status, searchTerm } = searchTaskDto;
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (searchTerm) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(searchTerm) ||
          task.description.includes(searchTerm),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    const taskToUpdate = this.getTaskById(id);
    taskToUpdate.status = status;
    return taskToUpdate;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
