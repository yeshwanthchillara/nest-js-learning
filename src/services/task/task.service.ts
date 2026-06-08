import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/tasks/task.entity';
import { CreateTaskDto } from '../../dto/tasks/tasks.dto';
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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const taskData = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.PENDING,
    };
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }
}
