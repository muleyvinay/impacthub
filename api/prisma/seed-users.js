const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function seedUsers() {
  try {
    // Create test user that matches the frontend mock data
    const user = await prisma.user.upsert({
      where: { id: 'user_123' },
      update: {},
      create: {
        id: 'user_123',
        email: 'john.doe@example.com',
        name: 'John Doe',
        role: 'DONOR',
        wallet: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        reputationScore: 75,
        verificationLevel: 'VERIFIED',
        isKycVerified: true,
      },
    });

    console.log('✅ User seeded successfully:', user);
  } catch (error) {
    console.error('❌ Error seeding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers();
