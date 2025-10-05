import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ChallengeGeneratorService } from './challenge-generator.service';

export interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  popularity: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  impact: string;
  suggestedChallenges: string[];
  createdAt: Date;
  lastUpdated: Date;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: string;
  sentiment: number;
  keywords: string[];
}

@Injectable()
export class TrendingService {
  private readonly logger = new Logger(TrendingService.name);

  constructor(
    private prisma: PrismaService,
    private challengeGenerator: ChallengeGeneratorService,
  ) {}

  async fetchTrendingTopics(): Promise<TrendingTopic[]> {
    try {
      // Simulate fetching from multiple sources
      const newsSources = await this.fetchNewsData();
      const socialTrends = await this.fetchSocialTrends();
      const globalEvents = await this.fetchGlobalEvents();
      
      const allTopics = [...newsSources, ...socialTrends, ...globalEvents];
      
      // Process and categorize topics
      const processedTopics = await this.processTopics(allTopics);
      
      // Store trending topics in database
      await this.storeTrendingTopics(processedTopics);
      
      return processedTopics;
    } catch (error) {
      this.logger.error('Error fetching trending topics:', error);
      return [];
    }
  }

  private async fetchNewsData(): Promise<NewsArticle[]> {
    // Simulate news API calls (in production, use real APIs like NewsAPI, Guardian, etc.)
    const mockNews = [
      {
        title: "Climate Change Summit: New Commitments Made",
        description: "World leaders announce new climate initiatives and funding commitments",
        url: "https://example.com/climate-summit-2025",
        publishedAt: new Date().toISOString(),
        source: "Climate News",
        category: "Environment",
        sentiment: 0.7,
        keywords: ["climate change", "summit", "commitments", "funding", "sustainability"]
      },
      {
        title: "Global Water Crisis: 2.2 Billion People Affected",
        description: "UN report highlights urgent need for clean water access worldwide",
        url: "https://example.com/water-crisis-2025",
        publishedAt: new Date().toISOString(),
        source: "UN News",
        category: "Health",
        sentiment: -0.3,
        keywords: ["water crisis", "clean water", "UN", "global health", "access"]
      },
      {
        title: "Digital Divide: Education Gap Widens",
        description: "Study shows increasing inequality in digital education access",
        url: "https://example.com/digital-divide-2025",
        publishedAt: new Date().toISOString(),
        source: "Education Today",
        category: "Education",
        sentiment: -0.5,
        keywords: ["digital divide", "education", "inequality", "technology", "access"]
      },
      {
        title: "Mental Health Awareness Month: New Initiatives",
        description: "Organizations launch new mental health support programs",
        url: "https://example.com/mental-health-2025",
        publishedAt: new Date().toISOString(),
        source: "Health Weekly",
        category: "Health",
        sentiment: 0.6,
        keywords: ["mental health", "awareness", "support", "initiatives", "wellness"]
      },
      {
        title: "Food Security: Global Hunger Increases",
        description: "New data shows rising food insecurity in developing countries",
        url: "https://example.com/food-security-2025",
        publishedAt: new Date().toISOString(),
        source: "Global Food Report",
        category: "Social Impact",
        sentiment: -0.4,
        keywords: ["food security", "hunger", "food insecurity", "developing countries", "nutrition"]
      }
    ];

    return mockNews;
  }

  private async fetchSocialTrends(): Promise<NewsArticle[]> {
    // Simulate social media trend analysis
    const mockSocialTrends = [
      {
        title: "#ClimateAction trending on social media",
        description: "Millions of posts about climate action and sustainability",
        url: "https://social.example.com/trending/climate-action",
        publishedAt: new Date().toISOString(),
        source: "Social Media",
        category: "Environment",
        sentiment: 0.8,
        keywords: ["#ClimateAction", "sustainability", "social media", "trending", "awareness"]
      },
      {
        title: "#MentalHealthMatters gains momentum",
        description: "Growing conversation about mental health support and awareness",
        url: "https://social.example.com/trending/mental-health",
        publishedAt: new Date().toISOString(),
        source: "Social Media",
        category: "Health",
        sentiment: 0.7,
        keywords: ["#MentalHealthMatters", "mental health", "support", "awareness", "community"]
      }
    ];

    return mockSocialTrends;
  }

  private async fetchGlobalEvents(): Promise<NewsArticle[]> {
    // Simulate global events and observances
    const mockEvents = [
      {
        title: "World Water Day 2025: Focus on Water Conservation",
        description: "Global observance highlighting the importance of water conservation",
        url: "https://example.com/world-water-day-2025",
        publishedAt: new Date().toISOString(),
        source: "UN Events",
        category: "Environment",
        sentiment: 0.5,
        keywords: ["World Water Day", "water conservation", "global observance", "sustainability"]
      },
      {
        title: "International Women's Day: Gender Equality Focus",
        description: "Global celebration of women's achievements and gender equality",
        url: "https://example.com/international-womens-day-2025",
        publishedAt: new Date().toISOString(),
        source: "UN Events",
        category: "Social Impact",
        sentiment: 0.8,
        keywords: ["International Women's Day", "gender equality", "women's rights", "empowerment"]
      }
    ];

    return mockEvents;
  }

  private async processTopics(articles: NewsArticle[]): Promise<TrendingTopic[]> {
    const topics: TrendingTopic[] = [];

    for (const article of articles) {
      const topic: TrendingTopic = {
        id: `topic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: article.title,
        description: article.description,
        category: article.category,
        source: article.source,
        popularity: this.calculatePopularity(article),
        sentiment: this.categorizeSentiment(article.sentiment),
        keywords: article.keywords,
        impact: this.assessImpact(article),
        suggestedChallenges: await this.generateChallengeSuggestions(article),
        createdAt: new Date(),
        lastUpdated: new Date()
      };

      topics.push(topic);
    }

    return topics;
  }

  private calculatePopularity(article: NewsArticle): number {
    // Simulate popularity calculation based on various factors
    const baseScore = Math.random() * 100;
    const sentimentBoost = article.sentiment > 0 ? 20 : -10;
    const recencyBoost = this.calculateRecencyBoost(article.publishedAt);
    
    return Math.min(100, Math.max(0, baseScore + sentimentBoost + recencyBoost));
  }

  private calculateRecencyBoost(publishedAt: string): number {
    const hoursAgo = (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60);
    return Math.max(0, 30 - hoursAgo);
  }

  private categorizeSentiment(sentiment: number): 'positive' | 'negative' | 'neutral' {
    if (sentiment > 0.3) return 'positive';
    if (sentiment < -0.3) return 'negative';
    return 'neutral';
  }

  private assessImpact(article: NewsArticle): string {
    const impactLevels = [
      "Local community impact",
      "Regional impact across multiple communities", 
      "National impact affecting entire countries",
      "Global impact affecting millions worldwide"
    ];
    
    // Simple impact assessment based on keywords and category
    if (article.keywords.some(k => k.includes('global') || k.includes('worldwide'))) {
      return impactLevels[3];
    } else if (article.category === 'Environment' || article.category === 'Health') {
      return impactLevels[2];
    } else if (article.category === 'Education' || article.category === 'Social Impact') {
      return impactLevels[1];
    }
    return impactLevels[0];
  }

  private async generateChallengeSuggestions(article: NewsArticle): Promise<string[]> {
    return await this.challengeGenerator.generateChallengesFromTopic(article);
  }

  private async storeTrendingTopics(topics: TrendingTopic[]): Promise<void> {
    try {
      for (const topic of topics) {
        await this.prisma.trendingTopic.upsert({
          where: { id: topic.id },
          update: {
            title: topic.title,
            description: topic.description,
            category: topic.category,
            source: topic.source,
            popularity: topic.popularity,
            sentiment: topic.sentiment,
            keywords: JSON.stringify(topic.keywords),
            impact: topic.impact,
            suggestedChallenges: JSON.stringify(topic.suggestedChallenges),
            lastUpdated: topic.lastUpdated
          },
          create: {
            id: topic.id,
            title: topic.title,
            description: topic.description,
            category: topic.category,
            source: topic.source,
            popularity: topic.popularity,
            sentiment: topic.sentiment,
            keywords: JSON.stringify(topic.keywords),
            impact: topic.impact,
            suggestedChallenges: JSON.stringify(topic.suggestedChallenges),
            createdAt: topic.createdAt,
            lastUpdated: topic.lastUpdated
          }
        });
      }
    } catch (error) {
      this.logger.error('Error storing trending topics:', error);
    }
  }

  async getTrendingTopics(limit: number = 10): Promise<TrendingTopic[]> {
    try {
      const topics = await this.prisma.trendingTopic.findMany({
        orderBy: [
          { popularity: 'desc' },
          { lastUpdated: 'desc' }
        ],
        take: limit
      });

      return topics.map(topic => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        category: topic.category,
        source: topic.source,
        popularity: topic.popularity,
        sentiment: topic.sentiment as 'positive' | 'negative' | 'neutral',
        keywords: JSON.parse(topic.keywords),
        impact: topic.impact,
        suggestedChallenges: JSON.parse(topic.suggestedChallenges),
        createdAt: topic.createdAt,
        lastUpdated: topic.lastUpdated
      }));
    } catch (error) {
      this.logger.error('Error fetching trending topics:', error);
      return [];
    }
  }

  async createChallengesFromTrending(): Promise<void> {
    try {
      const trendingTopics = await this.getTrendingTopics(5);
      
      for (const topic of trendingTopics) {
        if (topic.suggestedChallenges.length > 0) {
          await this.challengeGenerator.createChallengesFromTopic(topic);
        }
      }
    } catch (error) {
      this.logger.error('Error creating challenges from trending topics:', error);
    }
  }
}
