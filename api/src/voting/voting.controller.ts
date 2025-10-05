import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { VotingService } from './voting.service';
import type { VoteRequest } from './voting.service';

@Controller('voting')
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  @Post('vote')
  async vote(@Body() voteRequest: VoteRequest) {
    return await this.votingService.voteOnProposal(voteRequest);
  }

  @Get('proposal/:proposalId/votes')
  async getProposalVotes(@Param('proposalId') proposalId: string) {
    return await this.votingService.getProposalVotes(proposalId);
  }

  @Get('user/:userId/history')
  async getUserVotingHistory(@Param('userId') userId: string) {
    return await this.votingService.getUserVotingHistory(userId);
  }
}
