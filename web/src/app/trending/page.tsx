'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  popularity: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  impact: string;
  suggestedChallenges: string[];
  createdAt: string;
  lastUpdated: string;
}

interface GeneratedChallenge {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  points: number;
  requirements: string[];
  rewards: string[];
  impact: string;
  tags: string[];
  relatedTopic: string;
}

interface SentimentAnalysis {
  overall: {
    positive: number;
    negative: number;
    neutral: number;
  };
  byCategory: {
    [key: string]: {
      positive: number;
      negative: number;
      neutral: number;
    };
  };
}

export default function TrendingPage() {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [recommendedChallenges, setRecommendedChallenges] = useState<GeneratedChallenge[]>([]);
  const [sentimentAnalysis, setSentimentAnalysis] = useState<SentimentAnalysis | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch trending topics
      const topicsResponse = await fetch('http://localhost:3001/trending/topics?limit=20');
      const topics = await topicsResponse.json();
      setTrendingTopics(topics);

      // Fetch recommended challenges
      const challengesResponse = await fetch('http://localhost:3001/trending/recommendations/user_123?limit=5');
      const challenges = await challengesResponse.json();
      setRecommendedChallenges(challenges);

      // Fetch sentiment analysis
      const sentimentResponse = await fetch('http://localhost:3001/trending/sentiment-analysis');
      const sentiment = await sentimentResponse.json();
      setSentimentAnalysis(sentiment);

    } catch (error) {
      console.error('Error fetching trending data:', error);
      // Fallback to mock data
      setTrendingTopics(mockTrendingTopics);
      setRecommendedChallenges(mockChallenges);
      setSentimentAnalysis(mockSentimentAnalysis);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTrendingTopics = async () => {
    try {
      await fetch('http://localhost:3001/trending/refresh', { method: 'POST' });
      await fetchTrendingData();
    } catch (error) {
      console.error('Error refreshing trending topics:', error);
    }
  };

  const generateChallenges = async () => {
    try {
      await fetch('http://localhost:3001/trending/generate-challenges', { method: 'POST' });
      await fetchTrendingData();
    } catch (error) {
      console.error('Error generating challenges:', error);
    }
  };

  const filteredTopics = selectedCategory === 'All' 
    ? trendingTopics 
    : trendingTopics.filter(topic => topic.category === selectedCategory);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
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
      case 'Health': return '🏥';
      case 'Education': return '📚';
      case 'Social Impact': return '👥';
      case 'Technology': return '💻';
      default: return '📊';
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-black/70">Loading trending topics...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Trending Topics & AI Challenges</h1>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Discover what&apos;s trending globally and get personalized challenge recommendations 
              based on real-world events and your interests.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={refreshTrendingTopics}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              🔄 Refresh Trending Topics
            </button>
            <button
              onClick={generateChallenges}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              🤖 Generate AI Challenges
            </button>
          </div>

          {/* Sentiment Analysis */}
          {sentimentAnalysis && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 mb-12">
              <h2 className="text-2xl font-bold text-black mb-6">Global Sentiment Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{sentimentAnalysis.overall.positive}%</div>
                  <div className="text-black/70">Positive Sentiment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">{sentimentAnalysis.overall.negative}%</div>
                  <div className="text-black/70">Negative Sentiment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-600 mb-2">{sentimentAnalysis.overall.neutral}%</div>
                  <div className="text-black/70">Neutral Sentiment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{trendingTopics.length}</div>
                  <div className="text-black/70">Active Topics</div>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {['All', 'Environment', 'Health', 'Education', 'Social Impact', 'Technology'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/80 text-black/70 hover:bg-purple-50'
                }`}
              >
                {getCategoryIcon(category)} {category}
              </button>
            ))}
          </div>

          {/* Trending Topics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">Trending Topics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTopics.map((topic) => (
                <div key={topic.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getCategoryIcon(topic.category)}</span>
                      <div>
                        <h3 className="text-xl font-bold text-black">{topic.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(topic.sentiment)}`}>
                            {topic.sentiment}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                            {topic.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{Math.round(topic.popularity)}</div>
                      <div className="text-sm text-black/60">popularity</div>
                    </div>
                  </div>
                  
                  <p className="text-black/70 mb-4">{topic.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-bold text-black mb-2">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {topic.keywords.slice(0, 5).map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-black mb-2">Impact</h4>
                      <p className="text-black/70 text-sm">{topic.impact}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-black mb-2">Suggested Challenges</h4>
                      <div className="space-y-1">
                        {topic.suggestedChallenges.slice(0, 3).map((challenge, index) => (
                          <div key={index} className="text-sm text-black/70">• {challenge}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-black/60">
                    <span>Source: {topic.source}</span>
                    <span>{new Date(topic.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Challenges */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">AI-Generated Challenge Recommendations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendedChallenges.map((challenge, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
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
                  
                  <p className="text-black/70 mb-4">{challenge.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-black/60">Duration</span>
                      <span className="text-black">{challenge.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">Impact</span>
                      <span className="text-black text-sm">{challenge.impact}</span>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded-lg mb-4">
                    <h4 className="font-bold text-orange-800 mb-2">Requirements</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      {challenge.requirements.slice(0, 3).map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                    Join AI Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Ahead of Global Trends</h2>
            <p className="text-xl mb-6 opacity-90">
              Get personalized challenge recommendations based on what&apos;s happening in the world right now
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Explore All Challenges
              </button>
              <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors">
                Get Personalized Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Mock data for fallback
const mockTrendingTopics: TrendingTopic[] = [
  {
    id: '1',
    title: 'Climate Change Summit: New Commitments Made',
    description: 'World leaders announce new climate initiatives and funding commitments',
    category: 'Environment',
    source: 'Climate News',
    popularity: 85,
    sentiment: 'positive',
    keywords: ['climate change', 'summit', 'commitments', 'funding', 'sustainability'],
    impact: 'Global impact affecting millions worldwide',
    suggestedChallenges: ['30-Day Carbon Footprint Challenge', 'Climate Action Awareness Campaign'],
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Global Water Crisis: 2.2 Billion People Affected',
    description: 'UN report highlights urgent need for clean water access worldwide',
    category: 'Health',
    source: 'UN News',
    popularity: 78,
    sentiment: 'negative',
    keywords: ['water crisis', 'clean water', 'UN', 'global health', 'access'],
    impact: 'Global impact affecting millions worldwide',
    suggestedChallenges: ['Water Conservation Challenge', 'Clean Water Access Initiative'],
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }
];

const mockChallenges: GeneratedChallenge[] = [
  {
    title: '30-Day Carbon Footprint Challenge',
    description: 'Reduce your carbon footprint by 50% over 30 days through sustainable lifestyle changes',
    category: 'Environment',
    difficulty: 'Medium',
    duration: 30,
    points: 500,
    requirements: ['Track daily carbon footprint', 'Implement 5 sustainable practices'],
    rewards: ['500 Impact Points', 'Carbon Warrior Badge'],
    impact: 'Collectively reduce carbon emissions and promote sustainable living',
    tags: ['climate', 'sustainability', 'carbon'],
    relatedTopic: 'Climate Change Summit: New Commitments Made'
  }
];

const mockSentimentAnalysis: SentimentAnalysis = {
  overall: { positive: 45, negative: 30, neutral: 25 },
  byCategory: {
    Environment: { positive: 60, negative: 25, neutral: 15 },
    Health: { positive: 40, negative: 35, neutral: 25 }
  }
};
