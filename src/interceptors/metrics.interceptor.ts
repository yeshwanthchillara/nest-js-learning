import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';
import type { Request, Response } from 'express';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(MetricsInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = performance.now();

    return next.handle().pipe(
      tap((data: unknown) => {
        const responseTime = (performance.now() - startTime).toFixed(2);
        const serialized = (() => {
          try {
            return JSON.stringify(data);
          } catch {
            return String(data);
          }
        })();

        const responseSize = Buffer.byteLength(serialized, 'utf8');
        this.logger.log({
          method: request.method,
          url: request.originalUrl,
          statusCode: response.statusCode,
          responseTime: `${responseTime}ms`,
          responseSize: `${responseSize} bytes`,
        });
      }),
    );
  }
}
