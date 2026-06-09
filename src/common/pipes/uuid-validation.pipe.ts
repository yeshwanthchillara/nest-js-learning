import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export class UuidValidationPipe extends ParseUUIDPipe {
  constructor() {
    super({
      version: '4',
      exceptionFactory: () => {
        return new BadRequestException({
          success: false,
          message: 'Invalid UUID format',
        });
      },
    });
  }
}
