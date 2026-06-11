import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { MetricsInterceptor } from './interceptors/metrics.interceptor';
import { AllExceptionsFilter } from './common/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new MetricsInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter());

  // Uses global validation pipe for all incoming requests by DTOs, ensuring data integrity and security.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        console.log('Validation errors:', errors);
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          errors: error.constraints ? Object.values(error.constraints) : [],
        }));

        return new BadRequestException({
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') ?? 3000;
  await app.listen(port);
  console.log(`Server running on ${port}`);
}

void bootstrap();
