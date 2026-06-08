import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TaskService } from '../../services/task/task.service';
import { CreateTaskDto } from '../../dto/tasks/tasks.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTasks() {
    const allTasks = await this.tasksService.getAllTasks();
    return {
      success: true,
      message: 'Tasks retrieved successfully',
      data: allTasks,
    };
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() body: CreateTaskDto) {
    const task = await this.tasksService.createTask(body);
    return {
      success: true,
      message: 'Task created successfully',
      data: task,
    };
  }
}
