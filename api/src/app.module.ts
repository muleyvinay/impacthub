import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { VotingModule } from './voting/voting.module';
import { ReputationModule } from './reputation/reputation.module';
import { AntiGamingModule } from './anti-gaming/anti-gaming.module';
import { TrendingModule } from './trending/trending.module';

@Module({
  imports: [
    ProjectsModule,
    VotingModule,
    ReputationModule,
    AntiGamingModule,
    TrendingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
