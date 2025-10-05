import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TrendingTopic } from './trending.service';

export interface GeneratedChallenge {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  points: number;
  requirements: string[];
  rewards: string[];
  impact: string;
  tags: string[];
  relatedTopic: string;
}

@Injectable()
export class ChallengeGeneratorService {
  private readonly logger = new Logger(ChallengeGeneratorService.name);

  constructor(private prisma: PrismaService) {}

  async generateChallengesFromTopic(article: any): Promise<string[]> {
    const challenges: string[] = [];
    
    // Generate challenges based on article content and category
    switch (article.category) {
      case 'Environment':
        challenges.push(...this.generateEnvironmentalChallenges(article));
        break;
      case 'Health':
        challenges.push(...this.generateHealthChallenges(article));
        break;
      case 'Education':
        challenges.push(...this.generateEducationChallenges(article));
        break;
      case 'Social Impact':
        challenges.push(...this.generateSocialImpactChallenges(article));
        break;
      default:
        challenges.push(...this.generateGeneralChallenges(article));
    }

    return challenges;
  }

  private generateEnvironmentalChallenges(article: any): string[] {
    const challenges = [];
    
    if (article.keywords.some((k: string) => k.includes('climate') || k.includes('carbon'))) {
      challenges.push(
        "30-Day Carbon Footprint Challenge",
        "Climate Action Awareness Campaign",
        "Sustainable Living Challenge"
      );
    }
    
    if (article.keywords.some((k: string) => k.includes('water') || k.includes('conservation'))) {
      challenges.push(
        "Water Conservation Challenge",
        "Clean Water Access Initiative",
        "Water Usage Reduction Challenge"
      );
    }
    
    if (article.keywords.some((k: string) => k.includes('waste') || k.includes('recycling'))) {
      challenges.push(
        "Zero Waste Challenge",
        "Recycling Education Campaign",
        "Waste Reduction Initiative"
      );
    }

    return challenges;
  }

  private generateHealthChallenges(article: any): string[] {
    const challenges = [];
    
    if (article.keywords.some((k: string) => k.includes('mental') || k.includes('wellness'))) {
      challenges.push(
        "Mental Health Awareness Campaign",
        "Wellness Challenge",
        "Mental Health Support Initiative"
      );
    }
    
    if (article.keywords.some((k: string) => k.includes('nutrition') || k.includes('hunger'))) {
      challenges.push(
        "Nutrition Education Challenge",
        "Food Security Initiative",
        "Healthy Eating Challenge"
      );
    }
    
    if (article.keywords.some((k: string) => k.includes('exercise') || k.includes('fitness'))) {
      challenges.push(
        "Fitness Challenge",
        "Physical Wellness Initiative",
        "Active Lifestyle Campaign"
      );
    }

    return challenges;
  }

  private generateEducationChallenges(article: any): string[] {
    const challenges = [];
    
    if (article.keywords.some((k: string) => k.includes('digital') || k.includes('technology'))) {
      challenges.push(
        "Digital Literacy Challenge",
        "Technology Education Initiative",
        "Digital Skills Training"
      );
    }
    
    if (article.keywords.some((k: string) => k.includes('literacy') || k.includes('reading'))) {
      challenges.push(
        "Literacy Support Challenge",
        "Reading Initiative",
        "Education Access Campaign"
      );
    }
    
    if (article.keywords.some((k: string) => k.includes('skill') || k.includes('training'))) {
      challenges.push(
        "Skills Development Challenge",
        "Training Initiative",
        "Professional Development Campaign"
      );
    }

    return challenges;
  }

  private generateSocialImpactChallenges(article: any): string[] {
    const challenges = [];
    
    if (article.keywords.some((k: string) => k.includes('equality') || k.includes('diversity'))) {
      challenges.push(
        "Equality Awareness Campaign",
        "Diversity Initiative",
        "Inclusion Challenge"
      );
    }
    
    if (article.keywords.some((k: string) => k.includes('poverty') || k.includes('hunger'))) {
      challenges.push(
        "Poverty Awareness Challenge",
        "Hunger Relief Initiative",
        "Community Support Campaign"
      );
    }
    
    if (article.keywords.some((k: string) => k.includes('community') || k.includes('local'))) {
      challenges.push(
        "Community Building Challenge",
        "Local Impact Initiative",
        "Neighborhood Support Campaign"
      );
    }

    return challenges;
  }

  private generateGeneralChallenges(article: any): string[] {
    return [
      "Awareness Campaign Challenge",
      "Community Impact Initiative",
      "Social Change Challenge"
    ];
  }

  async createChallengesFromTopic(topic: TrendingTopic): Promise<void> {
    try {
      for (const challengeTitle of topic.suggestedChallenges) {
        const challenge = await this.generateDetailedChallenge(challengeTitle, topic);
        
        // Check if challenge already exists
        const existingChallenge = await this.prisma.challenge.findFirst({
          where: { title: challenge.title }
        });

        if (!existingChallenge) {
          await this.prisma.challenge.create({
            data: {
              title: challenge.title,
              description: challenge.description,
              category: challenge.category,
              difficulty: challenge.difficulty,
              duration: challenge.duration,
              points: challenge.points,
              requirements: JSON.stringify(challenge.requirements),
              rewards: JSON.stringify(challenge.rewards),
              impact: challenge.impact,
              tags: JSON.stringify(challenge.tags),
              isActive: true,
              participants: 0,
              completionRate: 0,
              deadline: this.calculateDeadline(challenge.duration),
              relatedTopic: challenge.relatedTopic,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          });

          this.logger.log(`Created new challenge: ${challenge.title}`);
        }
      }
    } catch (error) {
      this.logger.error('Error creating challenges from topic:', error);
    }
  }

  private async generateDetailedChallenge(title: string, topic: TrendingTopic): Promise<GeneratedChallenge> {
    const challengeTemplates = {
      "30-Day Carbon Footprint Challenge": {
        description: "Reduce your carbon footprint by 50% over 30 days through sustainable lifestyle changes",
        category: "Environment",
        difficulty: "Medium" as const,
        duration: 30,
        points: 500,
        requirements: [
          "Track daily carbon footprint",
          "Implement 5 sustainable practices",
          "Share progress weekly",
          "Document impact with photos"
        ],
        rewards: [
          "500 Impact Points",
          "Carbon Warrior Badge",
          "Tree Planting Certificate",
          "Sustainable Living Guide"
        ],
        impact: "Collectively reduce carbon emissions and promote sustainable living",
        tags: ["climate", "sustainability", "carbon", "environment"]
      },
      "Mental Health Awareness Campaign": {
        description: "Create and share content about mental health awareness and support",
        category: "Health",
        difficulty: "Medium" as const,
        duration: 21,
        points: 400,
        requirements: [
          "Create 5 educational posts",
          "Share resources with 20+ people",
          "Participate in awareness events",
          "Document outreach impact"
        ],
        rewards: [
          "400 Impact Points",
          "Mental Health Advocate Badge",
          "Awareness Campaign Certificate",
          "Mental Health Resources Kit"
        ],
        impact: "Increase mental health awareness and reduce stigma",
        tags: ["mental health", "awareness", "support", "wellness"]
      },
      "Digital Literacy Challenge": {
        description: "Help 5 people learn basic digital skills and computer literacy",
        category: "Education",
        difficulty: "Easy" as const,
        duration: 14,
        points: 300,
        requirements: [
          "Identify 5 people who need help",
          "Provide 2 hours of training each",
          "Document learning progress",
          "Share success stories"
        ],
        rewards: [
          "300 Impact Points",
          "Digital Mentor Badge",
          "Teaching Excellence Certificate",
          "Tech Skills Toolkit"
        ],
        impact: "Bridge the digital divide and improve digital literacy",
        tags: ["digital literacy", "education", "technology", "skills"]
      }
    };

    const template = (challengeTemplates as any)[title] || {
      description: `Take action on ${topic.title} and make a positive impact in your community`,
      category: topic.category,
      difficulty: "Medium" as const,
      duration: 14,
      points: 250,
      requirements: [
        "Research the topic thoroughly",
        "Take concrete action",
        "Document your impact",
        "Share your experience"
      ],
      rewards: [
        "250 Impact Points",
        "Impact Maker Badge",
        "Certificate of Completion",
        "Resource Toolkit"
      ],
      impact: `Contribute to addressing ${topic.title} in your community`,
      tags: topic.keywords.slice(0, 4)
    };

    return {
      title,
      ...template,
      relatedTopic: topic.title
    };
  }

  private calculateDeadline(duration: number): Date {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + duration);
    return deadline;
  }

  async getRecommendedChallenges(userId: string, limit: number = 5): Promise<any[]> {
    try {
      // Get user's interests and past challenges
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          donations: {
            include: { project: true }
          }
        }
      });

      if (!user) return [];

      // Analyze user's interests based on past activity
      const userInterests = this.analyzeUserInterests(user);
      
      // Get trending topics that match user interests
      const trendingTopics = await this.prisma.trendingTopic.findMany({
        where: {
          category: { in: userInterests },
          popularity: { gte: 50 }
        },
        orderBy: { popularity: 'desc' },
        take: limit
      });

      // Generate personalized challenges
      const recommendedChallenges = [];
      for (const topic of trendingTopics) {
        const challenges = await this.generateChallengesFromTopic({
          title: topic.title,
          category: topic.category,
          keywords: topic.keywords
        });

        for (const challengeTitle of challenges.slice(0, 1)) {
          const detailedChallenge = await this.generateDetailedChallenge(challengeTitle, {
            id: topic.id,
            title: topic.title,
            description: topic.description,
            category: topic.category,
            source: topic.source,
            popularity: topic.popularity,
            sentiment: topic.sentiment as 'positive' | 'negative' | 'neutral',
            keywords: Array.isArray(topic.keywords) ? topic.keywords : [topic.keywords],
            impact: topic.impact,
            suggestedChallenges: Array.isArray(topic.suggestedChallenges) ? topic.suggestedChallenges : [topic.suggestedChallenges],
            createdAt: topic.createdAt,
            lastUpdated: topic.lastUpdated
          });

          recommendedChallenges.push(detailedChallenge);
        }
      }

      return recommendedChallenges;
    } catch (error) {
      this.logger.error('Error getting recommended challenges:', error);
      return [];
    }
  }

  private analyzeUserInterests(user: any): string[] {
    const interests = new Set<string>();
    
    // Analyze past donations
    user.donations.forEach((donation: any) => {
      if (donation.project) {
        interests.add(donation.project.category);
      }
    });
    
    // Default interests if none found
    if (interests.size === 0) {
      return ['Environment', 'Health', 'Education', 'Social Impact'];
    }
    
    return Array.from(interests);
  }
}
