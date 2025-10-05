import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';
import { TrendingService } from './trending.service';
import { ChallengeGeneratorService } from './challenge-generator.service';

@Controller('trending')
export class TrendingController {
  constructor(
    private readonly trendingService: TrendingService,
    private readonly challengeGenerator: ChallengeGeneratorService,
  ) {}

  @Get('topics')
  async getTrendingTopics(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.trendingService.getTrendingTopics(limitNum);
  }

  @Post('refresh')
  async refreshTrendingTopics() {
    await this.trendingService.fetchTrendingTopics();
    return { message: 'Trending topics refreshed successfully' };
  }

  @Post('generate-challenges')
  async generateChallengesFromTrending() {
    await this.trendingService.createChallengesFromTrending();
    return { message: 'Challenges generated from trending topics successfully' };
  }

  @Get('recommendations/:userId')
  async getRecommendedChallenges(
    @Param('userId') userId: string,
    @Query('limit') limit?: string
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 5;
    return this.challengeGenerator.getRecommendedChallenges(userId, limitNum);
  }

  @Get('categories')
  async getTrendingCategories() {
    // Return trending categories with counts
    return {
      categories: [
        { name: 'Environment', count: 15, trending: true },
        { name: 'Health', count: 12, trending: true },
        { name: 'Education', count: 8, trending: false },
        { name: 'Social Impact', count: 10, trending: true },
        { name: 'Technology', count: 6, trending: false }
      ]
    };
  }

  @Get('sentiment-analysis')
  async getSentimentAnalysis() {
    // Return sentiment analysis of trending topics
    return {
      overall: {
        positive: 45,
        negative: 30,
        neutral: 25
      },
      byCategory: {
        Environment: { positive: 60, negative: 25, neutral: 15 },
        Health: { positive: 40, negative: 35, neutral: 25 },
        Education: { positive: 50, negative: 20, neutral: 30 },
        'Social Impact': { positive: 35, negative: 40, neutral: 25 }
      }
    };
  }
}
