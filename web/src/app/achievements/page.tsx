'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Donation' | 'Learning' | 'Community' | 'Impact' | 'Environmental';
  points: number;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  unlockedAt?: string;
}

interface UserStats {
  totalPoints: number;
  level: number;
  nextLevelPoints: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  streak: number;
  impactScore: number;
}

export default function AchievementsPage() {
  const [userStats] = useState<UserStats>({
    totalPoints: 2450,
    level: 8,
    nextLevelPoints: 500,
    achievementsUnlocked: 12,
    totalAchievements: 25,
    streak: 7,
    impactScore: 89,
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Donation',
      description: 'Made your first donation to a cause',
      icon: '🎯',
      category: 'Donation',
      points: 50,
      isUnlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: 'Common',
      unlockedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Climate Warrior',
      description: 'Donated to 5 environmental projects',
      icon: '🌱',
      category: 'Environmental',
      points: 200,
      isUnlocked: true,
      progress: 5,
      maxProgress: 5,
      rarity: 'Rare',
      unlockedAt: '2024-02-20'
    },
    {
      id: '3',
      title: 'Knowledge Seeker',
      description: 'Completed 10 educational modules',
      icon: '📚',
      category: 'Learning',
      points: 150,
      isUnlocked: true,
      progress: 10,
      maxProgress: 10,
      rarity: 'Rare',
      unlockedAt: '2024-03-10'
    },
    {
      id: '4',
      title: 'Community Champion',
      description: 'Voted on 20 community proposals',
      icon: '🗳️',
      category: 'Community',
      points: 100,
      isUnlocked: true,
      progress: 20,
      maxProgress: 20,
      rarity: 'Common',
      unlockedAt: '2024-03-15'
    },
    {
      id: '5',
      title: 'Impact Multiplier',
      description: 'Referred 5 friends to the platform',
      icon: '👥',
      category: 'Community',
      points: 300,
      isUnlocked: true,
      progress: 5,
      maxProgress: 5,
      rarity: 'Epic',
      unlockedAt: '2024-04-01'
    },
    {
      id: '6',
      title: 'Global Citizen',
      description: 'Supported projects in 10 different countries',
      icon: '🌍',
      category: 'Impact',
      points: 500,
      isUnlocked: false,
      progress: 7,
      maxProgress: 10,
      rarity: 'Epic'
    },
    {
      id: '7',
      title: 'Learning Legend',
      description: 'Completed 50 educational modules',
      icon: '🎓',
      category: 'Learning',
      points: 750,
      isUnlocked: false,
      progress: 23,
      maxProgress: 50,
      rarity: 'Legendary'
    },
    {
      id: '8',
      title: 'Philanthropist',
      description: 'Donated over $10,000 total',
      icon: '💎',
      category: 'Donation',
      points: 1000,
      isUnlocked: false,
      progress: 1240,
      maxProgress: 10000,
      rarity: 'Legendary'
    },
    {
      id: '9',
      title: 'Water Guardian',
      description: 'Helped provide clean water to 1000 people',
      icon: '💧',
      category: 'Environmental',
      points: 400,
      isUnlocked: false,
      progress: 340,
      maxProgress: 1000,
      rarity: 'Epic'
    },
    {
      id: '10',
      title: 'Education Advocate',
      description: 'Supported 15 education projects',
      icon: '🎒',
      category: 'Impact',
      points: 300,
      isUnlocked: false,
      progress: 8,
      maxProgress: 15,
      rarity: 'Rare'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Donation', 'Learning', 'Community', 'Impact', 'Environmental'];
  
  const filteredAchievements = selectedCategory === 'All' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressPercentage = (progress: number, maxProgress: number) => {
    return Math.min((progress / maxProgress) * 100, 100);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Achievements & Progress</h1>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Track your impact journey and unlock achievements as you make a difference in the world.
            </p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">{userStats.totalPoints.toLocaleString()}</div>
              <div className="text-black/70">Total Points</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">Level {userStats.level}</div>
              <div className="text-black/70">Current Level</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-green-600 mb-2">{userStats.achievementsUnlocked}</div>
              <div className="text-black/70">Achievements Unlocked</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">{userStats.streak} days</div>
              <div className="text-black/70">Active Streak</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">Level Progress</h2>
            <div className="flex items-center justify-between mb-4">
              <span className="text-black/70">Level {userStats.level}</span>
              <span className="text-black/70">Level {userStats.level + 1}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${(userStats.totalPoints % 1000) / 10}%` }}
              ></div>
            </div>
            <div className="text-center text-black/70">
              {userStats.nextLevelPoints - (userStats.totalPoints % 1000)} points to next level
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/80 text-black/70 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-300 ${
                  achievement.isUnlocked 
                    ? 'hover:shadow-xl' 
                    : 'opacity-75 hover:opacity-90'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-black mb-2">{achievement.title}</h3>
                <p className="text-black/70 mb-4">{achievement.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-black/60">Points</span>
                    <span className="font-bold text-black">{achievement.points}</span>
                  </div>
                  
                  {!achievement.isUnlocked && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-black/60">Progress</span>
                        <span className="text-black/70">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getProgressPercentage(achievement.progress, achievement.maxProgress)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {achievement.isUnlocked && achievement.unlockedAt && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm text-green-800 font-medium">
                        ✅ Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Keep Making a Difference!</h2>
            <p className="text-xl mb-6 opacity-90">
              Every action you take helps unlock new achievements and create positive change
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Explore Projects
              </button>
              <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
