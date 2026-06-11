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
  Query,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto, TaskQueryDto, UpdateTaskDto } from '../dto/tasks.dto';
import { UuidValidationPipe } from '../common/pipes/uuid-validation.pipe';
import { AuthGuard } from '../guards/tokenValidation.guard';
import { TaskOwnerGuard } from '../guards/taskOwner.guard';
import { AuthenticatedRequest } from '../types/authenticated-request.types';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTasks(
    @Req()
    req: AuthenticatedRequest,
  ) {
    const currentUserId = req.user.id;
    const allTasks = await this.tasksService.getAllTasks(currentUserId);
    return {
      success: true,
      message: 'Tasks retrieved successfully',
      data: allTasks,
    };
  }

  @Get('/filter')
  @HttpCode(HttpStatus.OK)
  async filterTasks(
    @Query() filterDto: TaskQueryDto,
    @Req()
    req: AuthenticatedRequest,
  ) {
    const currentUserId = req.user.id;
    const filteredTasks = await this.tasksService.filterTasks(
      filterDto,
      currentUserId,
    );
    return {
      success: true,
      message: 'Tasks filtered successfully',
      data: filteredTasks,
    };
  }

  @UseGuards(TaskOwnerGuard)
  @Get('/:id')
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
  async createTask(
    @Body() body: CreateTaskDto,
    @Headers('authorization')
    authHeader: string,
  ) {
    const task = await this.tasksService.createTask(body, authHeader);
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

  @UseGuards(TaskOwnerGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.OK)
  async updateTask(
    @Param('id', UuidValidationPipe) id: string,
    @Body() body: UpdateTaskDto,
  ) {
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

  @UseGuards(TaskOwnerGuard)
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
