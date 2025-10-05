const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function updateProposals() {
  try {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30); // 30 days from now

    // Update all ACTIVE proposals with current voting windows
    await prisma.proposal.updateMany({
      where: { status: 'ACTIVE' },
      data: {
        votingStart: now,
        votingEnd: futureDate,
      },
    });

    console.log('✅ Proposals updated with current voting windows');
  } catch (error) {
    console.error('❌ Error updating proposals:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateProposals();
