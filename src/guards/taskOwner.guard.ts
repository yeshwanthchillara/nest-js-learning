import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { AuthenticatedRequest } from '../types/authenticated-request.types';

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const taskId = Array.isArray(request.params.id)
      ? request.params.id[0]
      : request.params.id;

    const user = request.user;

    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.createdById !== user.id) {
      throw new ForbiddenException('You cannot access this task');
    }

    return true;
  }
}
