import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface VoteRequest {
  userId: string;
  proposalId: string;
  voteType: 'FOR' | 'AGAINST';
}

export interface RateLimitConfig {
  action: string;
  maxCount: number;
  windowHours: number;
}

@Injectable()
export class VotingService {
  private readonly rateLimits: Record<string, RateLimitConfig> = {
    vote: { action: 'vote', maxCount: 20, windowHours: 24 },
    proposal: { action: 'proposal', maxCount: 5, windowHours: 24 * 30 }, // 5 per month
    donation: { action: 'donation', maxCount: 10, windowHours: 24 },
  };

  constructor(private prisma: PrismaService) {}

  async voteOnProposal(voteRequest: VoteRequest): Promise<{ success: boolean; message: string }> {
    const { userId, proposalId, voteType } = voteRequest;

    // 1. Check if user exists and is verified
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 2. Check user verification level
    if (user.verificationLevel === 'BASIC' && user.reputationScore < 30) {
      throw new ForbiddenException('Insufficient reputation to vote');
    }

    // 3. Check rate limits
    await this.checkRateLimit(userId, 'vote');

    // 4. Check if proposal exists and is active
    const proposal = await this.prisma.proposal.findUnique({
      where: { id: proposalId },
    });

    if (!proposal) {
      throw new BadRequestException('Proposal not found');
    }

    if (proposal.status !== 'ACTIVE') {
      throw new BadRequestException('Proposal is not active for voting');
    }

    // 5. Check if voting window is open
    const now = new Date();
    if (proposal.votingStart && now < proposal.votingStart) {
      throw new BadRequestException('Voting has not started yet');
    }
    if (proposal.votingEnd && now > proposal.votingEnd) {
      throw new BadRequestException('Voting has ended');
    }

    // 6. Check if user already voted (enforced by unique constraint)
    const existingVote = await this.prisma.vote.findUnique({
      where: {
        userId_proposalId: {
          userId,
          proposalId,
        },
      },
    });

    if (existingVote) {
      // Update existing vote
      await this.prisma.$transaction(async (tx) => {
        // Remove old vote from counts
        await this.updateProposalVoteCounts(tx, proposalId, existingVote.voteType, -1);
        
        // Create new vote
        await tx.vote.update({
          where: { id: existingVote.id },
          data: { voteType },
        });
        
        // Add new vote to counts
        await this.updateProposalVoteCounts(tx, proposalId, voteType, 1);
      });

      return { success: true, message: 'Vote updated successfully' };
    }

    // 7. Create new vote
    await this.prisma.$transaction(async (tx) => {
      await tx.vote.create({
        data: {
          userId,
          proposalId,
          voteType,
        },
      });

      await this.updateProposalVoteCounts(tx, proposalId, voteType, 1);
    });

    // 8. Update rate limit
    await this.updateRateLimit(userId, 'vote');

    return { success: true, message: 'Vote recorded successfully' };
  }

  private async updateProposalVoteCounts(tx: any, proposalId: string, voteType: string, increment: number) {
    const updateData: any = {
      totalVotes: { increment },
    };

    if (voteType === 'FOR') {
      updateData.votesFor = { increment };
    } else {
      updateData.votesAgainst = { increment };
    }

    await tx.proposal.update({
      where: { id: proposalId },
      data: updateData,
    });
  }

  private async checkRateLimit(userId: string, action: string): Promise<void> {
    const config = this.rateLimits[action];
    if (!config) return;

    const windowStart = new Date();
    windowStart.setHours(windowStart.getHours() - config.windowHours);

    const rateLimit = await this.prisma.rateLimit.findUnique({
      where: {
        userId_action: {
          userId,
          action,
        },
      },
    });

    if (rateLimit) {
      // Check if window has expired
      if (rateLimit.windowStart < windowStart) {
        // Reset counter
        await this.prisma.rateLimit.update({
          where: { id: rateLimit.id },
          data: { count: 0, windowStart: new Date() },
        });
      } else if (rateLimit.count >= config.maxCount) {
        throw new ForbiddenException(`Rate limit exceeded for ${action}. Maximum ${config.maxCount} per ${config.windowHours} hours.`);
      }
    }
  }

  private async updateRateLimit(userId: string, action: string): Promise<void> {
    const config = this.rateLimits[action];
    if (!config) return;

    await this.prisma.rateLimit.upsert({
      where: {
        userId_action: {
          userId,
          action,
        },
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        userId,
        action,
        count: 1,
        windowStart: new Date(),
      },
    });
  }

  async getProposalVotes(proposalId: string) {
    return await this.prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        votes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                reputationScore: true,
                verificationLevel: true,
              },
            },
          },
        },
      },
    });
  }

  async getUserVotingHistory(userId: string) {
    return await this.prisma.vote.findMany({
      where: { userId },
      include: {
        proposal: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
