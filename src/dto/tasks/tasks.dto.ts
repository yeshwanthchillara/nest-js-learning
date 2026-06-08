import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TaskStatus } from '../../types/tasks/tasks.enum';

export class TaskDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(TaskStatus, {
    message:
      'Status must be one of the following values: pending, in_progress, completed',
  })
  status: TaskStatus = TaskStatus.PENDING;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  description!: string;
}

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsEnum(TaskStatus, {
    message:
      'Status must be one of the following values: pending, in_progress, completed',
  })
  status?: TaskStatus;
}
