const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding trending topics and challenges...');

  // Create trending topics
  const trendingTopics = [
    {
      id: 'trending_1',
      title: 'Climate Change Summit: New Commitments Made',
      description: 'World leaders announce new climate initiatives and funding commitments at the latest climate summit',
      category: 'Environment',
      source: 'Climate News',
      popularity: 85.5,
      sentiment: 'positive',
      keywords: JSON.stringify(['climate change', 'summit', 'commitments', 'funding', 'sustainability', 'carbon']),
      impact: 'Global impact affecting millions worldwide',
      suggestedChallenges: JSON.stringify([
        '30-Day Carbon Footprint Challenge',
        'Climate Action Awareness Campaign',
        'Sustainable Living Challenge'
      ]),
      createdAt: new Date(),
      lastUpdated: new Date()
    },
    {
      id: 'trending_2',
      title: 'Global Water Crisis: 2.2 Billion People Affected',
      description: 'UN report highlights urgent need for clean water access worldwide with devastating statistics',
      category: 'Health',
      source: 'UN News',
      popularity: 78.2,
      sentiment: 'negative',
      keywords: JSON.stringify(['water crisis', 'clean water', 'UN', 'global health', 'access', 'sanitation']),
      impact: 'Global impact affecting millions worldwide',
      suggestedChallenges: JSON.stringify([
        'Water Conservation Challenge',
        'Clean Water Access Initiative',
        'Water Usage Reduction Challenge'
      ]),
      createdAt: new Date(),
      lastUpdated: new Date()
    },
    {
      id: 'trending_3',
      title: 'Digital Divide: Education Gap Widens',
      description: 'Study shows increasing inequality in digital education access during remote learning era',
      category: 'Education',
      source: 'Education Today',
      popularity: 72.8,
      sentiment: 'negative',
      keywords: JSON.stringify(['digital divide', 'education', 'inequality', 'technology', 'access', 'remote learning']),
      impact: 'National impact affecting entire countries',
      suggestedChallenges: JSON.stringify([
        'Digital Literacy Challenge',
        'Technology Education Initiative',
        'Digital Skills Training'
      ]),
      createdAt: new Date(),
      lastUpdated: new Date()
    },
    {
      id: 'trending_4',
      title: 'Mental Health Awareness Month: New Initiatives',
      description: 'Organizations launch new mental health support programs and awareness campaigns',
      category: 'Health',
      source: 'Health Weekly',
      popularity: 68.4,
      sentiment: 'positive',
      keywords: JSON.stringify(['mental health', 'awareness', 'support', 'initiatives', 'wellness', 'therapy']),
      impact: 'Regional impact across multiple communities',
      suggestedChallenges: JSON.stringify([
        'Mental Health Awareness Campaign',
        'Wellness Challenge',
        'Mental Health Support Initiative'
      ]),
      createdAt: new Date(),
      lastUpdated: new Date()
    },
    {
      id: 'trending_5',
      title: 'Food Security: Global Hunger Increases',
      description: 'New data shows rising food insecurity in developing countries due to climate and economic factors',
      category: 'Social Impact',
      source: 'Global Food Report',
      popularity: 75.1,
      sentiment: 'negative',
      keywords: JSON.stringify(['food security', 'hunger', 'food insecurity', 'developing countries', 'nutrition', 'poverty']),
      impact: 'Global impact affecting millions worldwide',
      suggestedChallenges: JSON.stringify([
        'Nutrition Education Challenge',
        'Food Security Initiative',
        'Healthy Eating Challenge'
      ]),
      createdAt: new Date(),
      lastUpdated: new Date()
    }
  ];

  // Create trending topics
  for (const topic of trendingTopics) {
    await prisma.trendingTopic.upsert({
      where: { id: topic.id },
      update: topic,
      create: topic
    });
  }

  // Create AI-generated challenges
  const challenges = [
    {
      id: 'challenge_1',
      title: '30-Day Carbon Footprint Challenge',
      description: 'Reduce your carbon footprint by 50% over 30 days through sustainable lifestyle changes and document your impact',
      category: 'Environment',
      difficulty: 'Medium',
      duration: 30,
      points: 500,
      requirements: JSON.stringify([
        'Track daily carbon footprint using provided calculator',
        'Implement 5 sustainable practices (renewable energy, public transport, etc.)',
        'Share progress weekly on social media with #CarbonChallenge',
        'Document impact with before/after photos and data'
      ]),
      rewards: JSON.stringify([
        '500 Impact Points',
        'Carbon Warrior Badge',
        'Tree Planting Certificate',
        'Sustainable Living Guide'
      ]),
      impact: 'Collectively reduce carbon emissions and promote sustainable living practices in your community',
      tags: JSON.stringify(['climate', 'sustainability', 'carbon', 'environment', 'green living']),
      isActive: true,
      participants: 0,
      completionRate: 0,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      relatedTopic: 'Climate Change Summit: New Commitments Made',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'challenge_2',
      title: 'Mental Health Awareness Campaign',
      description: 'Create and share content about mental health awareness and support to reduce stigma in your community',
      category: 'Health',
      difficulty: 'Medium',
      duration: 21,
      points: 400,
      requirements: JSON.stringify([
        'Create 5 educational posts about mental health topics',
        'Share resources with 20+ people in your network',
        'Participate in at least 2 awareness events or discussions',
        'Document your outreach impact with testimonials'
      ]),
      rewards: JSON.stringify([
        '400 Impact Points',
        'Mental Health Advocate Badge',
        'Awareness Campaign Certificate',
        'Mental Health Resources Kit'
      ]),
      impact: 'Increase mental health awareness and reduce stigma in your community',
      tags: JSON.stringify(['mental health', 'awareness', 'support', 'wellness', 'community']),
      isActive: true,
      participants: 0,
      completionRate: 0,
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      relatedTopic: 'Mental Health Awareness Month: New Initiatives',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'challenge_3',
      title: 'Digital Literacy Challenge',
      description: 'Help 5 people learn basic digital skills and computer literacy to bridge the digital divide',
      category: 'Education',
      difficulty: 'Easy',
      duration: 14,
      points: 300,
      requirements: JSON.stringify([
        'Identify 5 people who need digital skills help',
        'Provide 2 hours of training each (10 hours total)',
        'Document learning progress with before/after assessments',
        'Share success stories and impact metrics'
      ]),
      rewards: JSON.stringify([
        '300 Impact Points',
        'Digital Mentor Badge',
        'Teaching Excellence Certificate',
        'Tech Skills Toolkit'
      ]),
      impact: 'Bridge the digital divide and improve digital literacy in your community',
      tags: JSON.stringify(['digital literacy', 'education', 'technology', 'skills', 'mentoring']),
      isActive: true,
      participants: 0,
      completionRate: 0,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      relatedTopic: 'Digital Divide: Education Gap Widens',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'challenge_4',
      title: 'Water Conservation Challenge',
      description: 'Reduce your water usage by 30% and help others in your community do the same',
      category: 'Environment',
      difficulty: 'Easy',
      duration: 21,
      points: 350,
      requirements: JSON.stringify([
        'Track daily water usage for 21 days',
        'Implement 3 water-saving techniques',
        'Educate 10 people about water conservation',
        'Document water savings with photos and data'
      ]),
      rewards: JSON.stringify([
        '350 Impact Points',
        'Water Warrior Badge',
        'Conservation Certificate',
        'Water-Saving Toolkit'
      ]),
      impact: 'Promote water conservation and raise awareness about the global water crisis',
      tags: JSON.stringify(['water conservation', 'environment', 'sustainability', 'crisis', 'awareness']),
      isActive: true,
      participants: 0,
      completionRate: 0,
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      relatedTopic: 'Global Water Crisis: 2.2 Billion People Affected',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'challenge_5',
      title: 'Food Security Initiative',
      description: 'Help address food insecurity in your community through education and direct action',
      category: 'Social Impact',
      difficulty: 'Hard',
      duration: 30,
      points: 600,
      requirements: JSON.stringify([
        'Research food insecurity in your local area',
        'Volunteer 20 hours at food banks or community kitchens',
        'Organize a food drive collecting 100+ items',
        'Create educational content about food security'
      ]),
      rewards: JSON.stringify([
        '600 Impact Points',
        'Food Security Champion Badge',
        'Community Service Certificate',
        'Food Security Resources Kit'
      ]),
      impact: 'Address local food insecurity and raise awareness about global hunger issues',
      tags: JSON.stringify(['food security', 'hunger', 'community service', 'social impact', 'volunteering']),
      isActive: true,
      participants: 0,
      completionRate: 0,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      relatedTopic: 'Food Security: Global Hunger Increases',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Create challenges
  for (const challenge of challenges) {
    await prisma.challenge.upsert({
      where: { id: challenge.id },
      update: challenge,
      create: challenge
    });
  }

  console.log('✅ Trending topics and challenges seeded successfully!');
  console.log(`📊 Created ${trendingTopics.length} trending topics`);
  console.log(`🎯 Created ${challenges.length} AI-generated challenges`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding trending data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
