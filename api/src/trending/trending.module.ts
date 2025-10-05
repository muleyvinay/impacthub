import { Module } from '@nestjs/common';
import { TrendingService } from './trending.service';
import { TrendingController } from './trending.controller';
import { ChallengeGeneratorService } from './challenge-generator.service';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TrendingService, ChallengeGeneratorService],
  controllers: [TrendingController],
  exports: [TrendingService, ChallengeGeneratorService],
})
export class TrendingModule {}
