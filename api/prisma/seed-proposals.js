const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function seedProposals() {
  try {
    // Create test proposals that match the frontend data
    const proposals = [
      {
        id: '1',
        title: 'Community Garden Initiative',
        description: 'Create a community garden in the downtown area to promote sustainable living and food security.',
        category: 'Environment',
        status: 'ACTIVE',
        votesFor: 35,
        votesAgainst: 10,
        totalVotes: 45,
        authorId: 'user_123',
        votingStart: new Date('2025-01-01'),
        votingEnd: new Date('2025-01-31'),
      },
      {
        id: '2',
        title: 'Digital Literacy Program',
        description: 'Provide free computer and internet training for seniors and underserved communities.',
        category: 'Education',
        status: 'ACTIVE',
        votesFor: 25,
        votesAgainst: 7,
        totalVotes: 32,
        authorId: 'user_123',
        votingStart: new Date('2025-01-01'),
        votingEnd: new Date('2025-01-31'),
      },
      {
        id: '3',
        title: 'Mental Health Support Network',
        description: 'Establish peer support groups and counseling services for mental health awareness.',
        category: 'Health',
        status: 'PASSED',
        votesFor: 50,
        votesAgainst: 17,
        totalVotes: 67,
        authorId: 'user_123',
        votingStart: new Date('2025-01-01'),
        votingEnd: new Date('2025-01-31'),
      }
    ];

    for (const proposalData of proposals) {
      await prisma.proposal.upsert({
        where: { id: proposalData.id },
        update: {},
        create: proposalData,
      });
    }

    console.log('✅ Proposals seeded successfully:', proposals.length);
  } catch (error) {
    console.error('❌ Error seeding proposals:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProposals();
