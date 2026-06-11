import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  SortOrder,
  TaskPriority,
  TaskSortKey,
  TaskStatus,
} from '../types/tasks.enum';

export class TaskDto {
  @IsOptional()
  @IsUUID('4', {
    message: 'Invalid UUID format',
  })
  id?: string;

  @IsString({
    message: 'Title must be a string',
  })
  @IsNotEmpty({
    message: 'Title is required',
  })
  @MinLength(3, {
    message: 'Title must be at least 3 characters',
  })
  @MaxLength(100, {
    message: 'Title cannot exceed 100 characters',
  })
  title!: string;

  @IsOptional()
  @IsString({
    message: 'Description must be a string',
  })
  @MaxLength(500, {
    message: 'Description cannot exceed 500 characters',
  })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message:
      'Status must be one of: PENDING, IN_PROGRESS, COMPLETED, CANCELLED',
  })
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority, {
    message: 'Priority must be one of: LOW, MEDIUM, HIGH, CRITICAL',
  })
  priority?: TaskPriority;

  @IsOptional()
  @IsString({
    message: 'CreatedBy must be a string',
  })
  @MinLength(3, {
    message: 'CreatedBy must be at least 3 characters',
  })
  @MaxLength(50, {
    message: 'CreatedBy cannot exceed 50 characters',
  })
  createdBy?: string;

  @IsOptional()
  @IsDateString(
    {
      strict: true,
      strictSeparator: true,
    },
    {
      message: 'Due date must be a valid UTC timestamp',
    },
  )
  dueDate?: string;

  @IsDateString(
    {
      strict: true,
      strictSeparator: true,
    },
    {
      message: 'CreatedAt must be a valid UTC timestamp',
    },
  )
  createdAt?: string;

  @IsDateString(
    {
      strict: true,
      strictSeparator: true,
    },
    {
      message: 'UpdatedAt must be a valid UTC timestamp',
    },
  )
  updatedAt?: string;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(TaskStatus, {
    message:
      'Status must be one of the following values: pending, in_progress, completed',
  })
  status!: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority, {
    message:
      'Priority must be one of the following values: low, medium, high, critical',
  })
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString(
    {
      strict: true,
      strictSeparator: true,
    },
    {
      message: 'Due date must be a valid UTC timestamp',
    },
  )
  dueDate?: string;
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

  @IsOptional()
  @IsEnum(TaskPriority, {
    message:
      'Priority must be one of the following values: low, medium, high, critical',
  })
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString(
    {
      strict: true,
      strictSeparator: true,
    },
    {
      message: 'Due date must be a valid UTC timestamp',
    },
  )
  dueDate?: string;
}

export class TaskIdParamDto {
  @IsUUID('4', {
    message: 'Invalid UUID format',
  })
  id!: string;
}

export class TaskQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString(
    {
      strict: true,
      strictSeparator: true,
    },
    {
      message: 'Due date must be a valid UTC timestamp',
    },
  )
  dueDate?: string;

  @IsOptional()
  @IsEnum(TaskSortKey)
  sortKey?: TaskSortKey;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
