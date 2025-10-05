const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const projects = [
    { title: 'Clean Water Initiative', mission: 'Provide sustainable access to clean water.', category: 'Health', goal: 25000, raised: 18420 },
    { title: 'After-school Learning', mission: 'Tutoring for underserved students.', category: 'Education', goal: 15000, raised: 8200 },
    { title: 'Mangrove Restoration', mission: 'Restore coastal mangroves for climate resilience.', category: 'Climate', goal: 30000, raised: 12000 },
  ];
  for (const p of projects) {
    await prisma.project.create({ data: p });
  }
}

main().finally(() => prisma.$disconnect());


