import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReputationService {
  constructor(private prisma: PrismaService) {}

  async calculateReputationScore(userId: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        donations: true,
        votes: true,
        proposals: true,
      },
    });

    if (!user) return 0;

    let score = 0;

    // Base score from verification level
    switch (user.verificationLevel) {
      case 'BASIC':
        score += 10;
        break;
      case 'VERIFIED':
        score += 30;
        break;
      case 'PREMIUM':
        score += 50;
        break;
    }

    // Donation history (40% weight)
    const totalDonated = user.donations.reduce((sum, donation) => sum + donation.amount, 0);
    const donationScore = Math.min(totalDonated / 1000, 40); // Max 40 points for donations
    score += donationScore;

    // Project success (30% weight)
    const successfulProjects = user.proposals.filter(p => p.status === 'PASSED').length;
    const projectScore = Math.min(successfulProjects * 5, 30); // Max 30 points for projects
    score += projectScore;

    // Community participation (20% weight)
    const voteCount = user.votes.length;
    const participationScore = Math.min(voteCount * 0.5, 20); // Max 20 points for voting
    score += participationScore;

    // Account age bonus (10% weight)
    const accountAge = Date.now() - user.createdAt.getTime();
    const ageInDays = accountAge / (1000 * 60 * 60 * 24);
    const ageScore = Math.min(ageInDays / 30, 10); // Max 10 points for account age
    score += ageScore;

    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  async updateUserReputation(userId: string): Promise<void> {
    const newScore = await this.calculateReputationScore(userId);
    
    await this.prisma.user.update({
      where: { id: userId },
      data: { reputationScore: newScore },
    });
  }

  async getUserReputation(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        reputationScore: true,
        verificationLevel: true,
        isKycVerified: true,
        createdAt: true,
      },
    });

    if (!user) return null;

    return {
      ...user,
      reputationLevel: this.getReputationLevel(user.reputationScore),
      benefits: this.getReputationBenefits(user.reputationScore),
    };
  }

  private getReputationLevel(score: number): string {
    if (score >= 90) return 'LEGENDARY';
    if (score >= 80) return 'EXPERT';
    if (score >= 70) return 'ADVANCED';
    if (score >= 60) return 'INTERMEDIATE';
    if (score >= 40) return 'BEGINNER';
    return 'NEWCOMER';
  }

  private getReputationBenefits(score: number): string[] {
    const benefits: string[] = [];

    if (score >= 30) {
      benefits.push('Can vote on proposals');
    }
    if (score >= 50) {
      benefits.push('Can create proposals');
      benefits.push('Higher voting weight');
    }
    if (score >= 70) {
      benefits.push('Can moderate content');
      benefits.push('Priority support');
    }
    if (score >= 90) {
      benefits.push('Governance participation');
      benefits.push('Early access to features');
    }

    return benefits;
  }

  async getReputationLeaderboard(limit: number = 10) {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        reputationScore: true,
        verificationLevel: true,
      },
      orderBy: { reputationScore: 'desc' },
      take: limit,
    });
  }
}
