import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  InternalServerErrorException,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from '../../services/task/task.service';
import { CreateTaskDto, UpdateTaskDto } from '../../dto/tasks/tasks.dto';
import { UuidValidationPipe } from '../../common/pipes/uuid-validation.pipe';

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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTask(@Param('id', UuidValidationPipe) id: string) {
    const task = await this.tasksService.getTaskById(id);
    return {
      success: true,
      message: 'Task retrieved successfully',
      data: task,
    };
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() body: CreateTaskDto) {
    const task = await this.tasksService.createTask(body);
    if (task) {
      return {
        success: true,
        message: 'Task created successfully',
        data: task,
      };
    } else {
      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to create task',
      });
    }
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  async updateTask(
    @Param('id', UuidValidationPipe) id: string,
    @Body() body: UpdateTaskDto,
  ) {
    console.log('Received update data:', body);
    const task = await this.tasksService.updateTask(id, body);
    if (task) {
      return {
        success: true,
        message: 'Task updated successfully',
        data: task,
      };
    } else {
      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to update task',
      });
    }
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteTask(@Param('id', UuidValidationPipe) id: string) {
    await this.tasksService.deleteTask(id);
    return {
      success: true,
      message: 'Task deleted successfully',
    };
  }
}
