import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import authConfig from '../config/auth.config';

interface AuthenticatedRequest extends Request {
  user?: string | Record<string, unknown>;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token missing');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token format');
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = authConfig().jwtSecret;

    if (!jwtSecret) {
      throw new Error('JWT secret missing');
    }

    try {
      const decoded = verify(token, jwtSecret);
      request.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
