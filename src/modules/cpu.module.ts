import { Module } from '@nestjs/common';
import { CpuController } from '../controllers/cpu.controller';
import { CpuService } from '../services/cpu.service';

@Module({
  imports: [],
  controllers: [CpuController],
  providers: [CpuService],
})
export class CpuModule {}
