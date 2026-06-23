import { Controller, Get, Query } from '@nestjs/common';
import { CpuService } from './../services/cpu.service';

@Controller('cpu')
export class CpuController {
  constructor(private readonly cpuService: CpuService) {}

  @Get('primes')
  runCpuTask(@Query('limit') limit = '100000') {
    const start = Date.now();

    const count = this.cpuService.countPrimes(Number(limit));

    return {
      limit: Number(limit),
      primeCount: count,
      durationMs: Date.now() - start,
    };
  }
}
