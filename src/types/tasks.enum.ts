export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  critical = 'critical',
}

export enum TaskSortKey {
  TITLE = 'title',
  DESCRIPTION = 'description',
  STATUS = 'status',
  PRIORITY = 'priority',
  DUE_DATE = 'dueDate',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
