import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto, TaskQueryDto, UpdateTaskDto } from '../dto/tasks.dto';
import { TaskStatus } from '../types/tasks.enum';
import { decode } from 'jsonwebtoken';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(currentUserId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: {
        createdById: currentUserId,
      },
    });
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

  async createTask(
    createTaskDto: CreateTaskDto,
    authToken: string,
  ): Promise<Task> {
    const userId = this.extractUserIdFromAuthToken(authToken);
    const taskData = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.PENDING,
      priority: createTaskDto.priority,
      createdById: userId,
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

  async filterTasks(
    filterDto: TaskQueryDto,
    currentUserId: string,
  ): Promise<Task[]> {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      sortKey,
      sortOrder,
    } = filterDto;
    const tasks: Task[] = await this.taskRepository.query(
      `
      SELECT *
      FROM filter_or_sort_tasks(
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8
      )
      `,
      [
        currentUserId,
        status ?? null,
        title ?? null,
        description ?? null,
        priority ?? null,
        dueDate ?? null,
        sortKey ?? 'createdAt',
        sortOrder ?? 'DESC',
      ],
    );
    return tasks;
  }

  extractUserIdFromAuthToken(authToken: string): string {
    const tokenParts = authToken.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new NotFoundException({
        success: false,
        message: 'Invalid authorization token format',
      });
    }
    const decoded = decode(tokenParts[1]);
    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      return decoded.id as string;
    }
    throw new NotFoundException({
      success: false,
      message: 'Invalid authorization token',
    });
  }
}
