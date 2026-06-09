import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
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
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message:
      'Status must be one of the following values: pending, in_progress, completed',
  })
  status?: TaskStatus;
}

export class TaskIdParamDto {
  @IsUUID('4', {
    message: 'Invalid UUID format',
  })
  id!: string;
}
