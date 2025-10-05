import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AntiGamingService {
  constructor(private prisma: PrismaService) {}

  async detectSuspiciousActivity(userId: string, action: string, metadata?: any): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        donations: true,
        votes: true,
        proposals: true,
      },
    });

    if (!user) return false;

    // Check for rapid-fire actions
    const recentActions = await this.getRecentActions(userId, 1); // Last hour
    if (recentActions.length > 10) {
      await this.flagSuspiciousActivity(userId, 'RAPID_FIRE_ACTIONS', { count: recentActions.length });
      return true;
    }

    // Check for wash trading (donating to own projects)
    if (action === 'donation' && metadata?.projectId) {
      const isOwnProject = await this.isUserProjectOwner(userId, metadata.projectId);
      if (isOwnProject) {
        await this.flagSuspiciousActivity(userId, 'WASH_TRADING', { projectId: metadata.projectId });
        return true;
      }
    }

    // Check for unusual donation patterns
    if (action === 'donation' && metadata?.amount) {
      const totalDonated = user.donations.reduce((sum, d) => sum + d.amount, 0);
      const newTotal = totalDonated + metadata.amount;
      
      // Flag if donating more than 10x their previous total
      if (totalDonated > 0 && metadata.amount > totalDonated * 10) {
        await this.flagSuspiciousActivity(userId, 'UNUSUAL_DONATION_PATTERN', {
          previousTotal: totalDonated,
          newAmount: metadata.amount,
        });
        return true;
      }
    }

    // Check for vote manipulation
    if (action === 'vote') {
      const recentVotes = await this.prisma.vote.findMany({
        where: {
          userId,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      });

      // Flag if voting on too many proposals in short time
      if (recentVotes.length > 15) {
        await this.flagSuspiciousActivity(userId, 'VOTE_MANIPULATION', { voteCount: recentVotes.length });
        return true;
      }
    }

    // Check for account age vs activity
    const accountAge = Date.now() - user.createdAt.getTime();
    const ageInDays = accountAge / (1000 * 60 * 60 * 24);
    
    if (ageInDays < 1 && (user.donations.length > 5 || user.votes.length > 10)) {
      await this.flagSuspiciousActivity(userId, 'NEW_ACCOUNT_HIGH_ACTIVITY', {
        accountAge: ageInDays,
        donations: user.donations.length,
        votes: user.votes.length,
      });
      return true;
    }

    return false;
  }

  private async getRecentActions(userId: string, hours: number): Promise<any[]> {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const [donations, votes, proposals] = await Promise.all([
      this.prisma.donation.findMany({
        where: { userId, createdAt: { gte: since } },
      }),
      this.prisma.vote.findMany({
        where: { userId, createdAt: { gte: since } },
      }),
      this.prisma.proposal.findMany({
        where: { authorId: userId, createdAt: { gte: since } },
      }),
    ]);

    return [...donations, ...votes, ...proposals];
  }

  private async isUserProjectOwner(userId: string, projectId: string): Promise<boolean> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { milestones: { include: { project: true } } },
    });

    // This is a simplified check - in a real system, you'd have a proper project ownership model
    return false; // For now, assume no ownership conflicts
  }

  private async flagSuspiciousActivity(userId: string, type: string, metadata: any): Promise<void> {
    // In a real system, you'd store this in a suspicious_activity table
    console.warn(`Suspicious activity detected for user ${userId}:`, { type, metadata });
    
    // For now, we'll just log it. In production, you'd:
    // 1. Store in database
    // 2. Send alerts to moderators
    // 3. Potentially suspend user temporarily
    // 4. Require additional verification
  }

  async getUserRiskScore(userId: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        donations: true,
        votes: true,
        proposals: true,
      },
    });

    if (!user) return 100; // High risk for unknown users

    let riskScore = 0;

    // Account age factor
    const accountAge = Date.now() - user.createdAt.getTime();
    const ageInDays = accountAge / (1000 * 60 * 60 * 24);
    if (ageInDays < 7) riskScore += 30;
    else if (ageInDays < 30) riskScore += 15;

    // Verification level
    if (user.verificationLevel === 'BASIC') riskScore += 20;
    if (!user.isKycVerified) riskScore += 25;

    // Activity patterns
    const donationCount = user.donations.length;
    const voteCount = user.votes.length;
    const proposalCount = user.proposals.length;

    // High activity on new account
    if (ageInDays < 1 && (donationCount > 3 || voteCount > 5)) riskScore += 40;

    // Unusual donation amounts
    const totalDonated = user.donations.reduce((sum, d) => sum + d.amount, 0);
    const avgDonation = donationCount > 0 ? totalDonated / donationCount : 0;
    if (avgDonation > 10000) riskScore += 20; // Very high average donations

    // Low reputation
    if (user.reputationScore < 30) riskScore += 25;

    return Math.min(100, riskScore);
  }

  async getSuspiciousUsers(limit: number = 10): Promise<any[]> {
    // This would query a suspicious_activity table in a real system
    // For now, return users with low reputation and high activity
    return await this.prisma.user.findMany({
      where: {
        reputationScore: { lt: 30 },
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
      },
      include: {
        donations: true,
        votes: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
