import { Module } from '@nestjs/common';
import { AntiGamingService } from './anti-gaming.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AntiGamingService],
  exports: [AntiGamingService],
})
export class AntiGamingModule {}
