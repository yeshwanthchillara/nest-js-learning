import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(
    exception: unknown,

    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: any = {
      success: false,
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      errorResponse = exception.getResponse();
    }

    response.status(status).json({
      ...errorResponse,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
