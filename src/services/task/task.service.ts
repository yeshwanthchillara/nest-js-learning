import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/tasks/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../../dto/tasks/tasks.dto';
import { TaskStatus } from '../../types/tasks/tasks.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({});
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException({
        success: false,
        message: 'Task not found with the id: ' + id,
      });
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const taskData = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.PENDING,
    };
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  async updateTask(id: string, updateData: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.update(id, updateData);
    if (task.affected === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Task not found with the id: ' + id,
      });
    } else {
      return await this.getTaskById(id);
    }
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Task not found with the id: ' + id,
      });
    }
  }
}
