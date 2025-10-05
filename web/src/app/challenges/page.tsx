'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number; // in days
  points: number;
  isActive: boolean;
  participants: number;
  completionRate: number;
  impact: string;
  requirements: string[];
  rewards: string[];
  deadline: string;
  isParticipating: boolean;
  progress: number;
}

interface ChallengeSubmission {
  id: string;
  challengeId: string;
  userId: string;
  content: string;
  media: string[];
  impact: string;
  createdAt: string;
  likes: number;
  isVerified: boolean;
}

export default function ChallengesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: '30-Day Carbon Footprint Challenge',
      description: 'Reduce your carbon footprint by 50% over 30 days through sustainable lifestyle changes',
      category: 'Environment',
      difficulty: 'Medium',
      duration: 30,
      points: 500,
      isActive: true,
      participants: 1247,
      completionRate: 68,
      impact: 'Collectively reduced 2.5 tons of CO2 emissions',
      requirements: [
        'Track daily carbon footprint',
        'Implement 5 sustainable practices',
        'Share progress weekly',
        'Document impact with photos'
      ],
      rewards: [
        '500 Impact Points',
        'Carbon Warrior Badge',
        'Tree Planting Certificate',
        'Sustainable Living Guide'
      ],
      deadline: '2025-02-15',
      isParticipating: true,
      progress: 45
    },
    {
      id: '2',
      title: 'Digital Literacy Mentor',
      description: 'Help 5 people learn basic digital skills and computer literacy',
      category: 'Education',
      difficulty: 'Easy',
      duration: 14,
      points: 300,
      isActive: true,
      participants: 892,
      completionRate: 82,
      impact: 'Helped 4,200+ people gain digital skills',
      requirements: [
        'Identify 5 people who need help',
        'Provide 2 hours of training each',
        'Document learning progress',
        'Share success stories'
      ],
      rewards: [
        '300 Impact Points',
        'Digital Mentor Badge',
        'Teaching Excellence Certificate',
        'Tech Skills Toolkit'
      ],
      deadline: '2025-01-25',
      isParticipating: false,
      progress: 0
    },
    {
      id: '3',
      title: 'Community Garden Initiative',
      description: 'Start or contribute to a community garden project in your area',
      category: 'Community',
      difficulty: 'Hard',
      duration: 60,
      points: 750,
      isActive: true,
      participants: 456,
      completionRate: 45,
      impact: 'Created 12 community gardens serving 500+ families',
      requirements: [
        'Find or start a garden project',
        'Recruit 10+ community members',
        'Plant and maintain for 2 months',
        'Document harvest and impact'
      ],
      rewards: [
        '750 Impact Points',
        'Community Leader Badge',
        'Garden Master Certificate',
        'Sustainable Agriculture Guide'
      ],
      deadline: '2025-03-15',
      isParticipating: false,
      progress: 0
    },
    {
      id: '4',
      title: 'Mental Health Awareness Campaign',
      description: 'Create and share content about mental health awareness and support',
      category: 'Health',
      difficulty: 'Medium',
      duration: 21,
      points: 400,
      isActive: true,
      participants: 678,
      completionRate: 71,
      impact: 'Reached 15,000+ people with mental health awareness',
      requirements: [
        'Create 5 educational posts',
        'Share resources with 20+ people',
        'Participate in awareness events',
        'Document outreach impact'
      ],
      rewards: [
        '400 Impact Points',
        'Mental Health Advocate Badge',
        'Awareness Campaign Certificate',
        'Mental Health Resources Kit'
      ],
      deadline: '2025-02-10',
      isParticipating: true,
      progress: 25
    }
  ]);

  const [submissions, setSubmissions] = useState<ChallengeSubmission[]>([
    {
      id: '1',
      challengeId: '1',
      userId: 'user_123',
      content: 'Day 15 of my carbon footprint challenge! Switched to biking to work, reduced meat consumption by 70%, and started composting. Already seeing a 30% reduction in my carbon footprint! 🌱🚴‍♂️',
      media: ['bike-commute.jpg', 'compost-setup.jpg'],
      impact: 'Reduced daily carbon footprint from 12kg to 8.4kg CO2',
      createdAt: '2025-01-10',
      likes: 23,
      isVerified: true
    },
    {
      id: '2',
      challengeId: '2',
      userId: 'user_456',
      content: 'Just finished teaching my neighbor how to use email and video calls! She\'s now able to connect with her grandchildren who live across the country. The joy on her face was priceless! 💻❤️',
      media: ['teaching-session.jpg'],
      impact: 'Helped 1 person gain essential digital communication skills',
      createdAt: '2025-01-08',
      likes: 18,
      isVerified: true
    }
  ]);

  const [newSubmission, setNewSubmission] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const categories = ['All', 'Environment', 'Education', 'Community', 'Health'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'All' || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isParticipating: true, participants: challenge.participants + 1 }
        : challenge
    ));
  };

  const handleSubmitProgress = (challengeId: string) => {
    if (newSubmission.trim()) {
      const submission: ChallengeSubmission = {
        id: Date.now().toString(),
        challengeId,
        userId: 'user_123',
        content: newSubmission,
        media: [],
        impact: 'Progress update submitted',
        createdAt: new Date().toISOString().split('T')[0],
        likes: 0,
        isVerified: false
      };
      setSubmissions([submission, ...submissions]);
      setNewSubmission('');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Environment': return '🌱';
      case 'Education': return '📚';
      case 'Community': return '👥';
      case 'Health': return '🏥';
      default: return '🎯';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Impact Challenges</h1>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Take on meaningful challenges that create real-world impact. Learn new skills, 
              help others, and make a difference while earning rewards and recognition.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
              <div className="text-black/70">Active Challenges</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">3,273</div>
              <div className="text-black/70">Total Participants</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-green-600 mb-2">66%</div>
              <div className="text-black/70">Average Completion</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">22K</div>
              <div className="text-black/70">Lives Impacted</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getCategoryIcon(challenge.category)}</span>
                    <div>
                      <h3 className="text-xl font-bold text-black">{challenge.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                          {challenge.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{challenge.points}</div>
                    <div className="text-sm text-black/60">points</div>
                  </div>
                </div>
                
                <p className="text-black/70 mb-6">{challenge.description}</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-black/60">Duration</span>
                    <span className="text-black">{challenge.duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60">Participants</span>
                    <span className="text-black">{challenge.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60">Completion Rate</span>
                    <span className="text-black">{challenge.completionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60">Deadline</span>
                    <span className="text-black">{challenge.deadline}</span>
                  </div>
                </div>
                
                {challenge.isParticipating && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-black/60">Your Progress</span>
                      <span className="text-black">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="bg-orange-50 p-4 rounded-lg mb-6">
                  <h4 className="font-bold text-orange-800 mb-2">Impact</h4>
                  <p className="text-orange-700 text-sm">{challenge.impact}</p>
                </div>
                
                <div className="flex gap-3">
                  {challenge.isParticipating ? (
                    <button 
                      onClick={() => setSelectedChallenge(challenge)}
                      className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                    >
                      Update Progress
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleJoinChallenge(challenge.id)}
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Join Challenge
                    </button>
                  )}
                  <button 
                    onClick={() => setSelectedChallenge(challenge)}
                    className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Submissions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">Recent Submissions</h2>
            <div className="space-y-6">
              {submissions.map((submission) => (
                <div key={submission.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      U
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-black">Community Member</span>
                        <span className="text-black/60">•</span>
                        <span className="text-black/60">{submission.createdAt}</span>
                        {submission.isVerified && (
                          <span className="text-green-600">✓ Verified</span>
                        )}
                      </div>
                      <p className="text-black mb-3">{submission.content}</p>
                      <div className="bg-green-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-green-800 font-medium">Impact: {submission.impact}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-500 hover:text-red-600">
                          <span>❤️</span>
                          <span>{submission.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
                          <span>💬</span>
                          <span>Comment</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-green-600">
                          <span>🔄</span>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge Detail Modal */}
          {selectedChallenge && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-black">{selectedChallenge.title}</h3>
                  <button 
                    onClick={() => setSelectedChallenge(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-black mb-2">Description</h4>
                    <p className="text-black/70">{selectedChallenge.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-black mb-2">Requirements</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedChallenge.requirements.map((req, index) => (
                        <li key={index} className="text-black/70">{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-black mb-2">Rewards</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedChallenge.rewards.map((reward, index) => (
                        <li key={index} className="text-black/70">{reward}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedChallenge.isParticipating && (
                    <div>
                      <h4 className="font-bold text-black mb-2">Update Your Progress</h4>
                      <textarea
                        value={newSubmission}
                        onChange={(e) => setNewSubmission(e.target.value)}
                        placeholder="Share your progress, challenges, and impact..."
                        className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black resize-none"
                        rows={4}
                      />
                      <button 
                        onClick={() => handleSubmitProgress(selectedChallenge.id)}
                        className="mt-3 bg-orange-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                        disabled={!newSubmission.trim()}
                      >
                        Submit Update
                      </button>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    {selectedChallenge.isParticipating ? (
                      <button 
                        onClick={() => setSelectedChallenge(null)}
                        className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                      >
                        Continue Challenge
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          handleJoinChallenge(selectedChallenge.id);
                          setSelectedChallenge(null);
                        }}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Join Challenge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Real Impact?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of people taking on challenges that create meaningful change in the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Browse All Challenges
              </button>
              <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:text-orange-600 transition-colors">
                Create Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
