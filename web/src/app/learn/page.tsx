'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  isCompleted: boolean;
  progress: number;
  points: number;
  topics: string[];
  resources: {
    type: 'video' | 'article' | 'interactive' | 'quiz';
    title: string;
    url: string;
  }[];
  impact: string;
  relatedProjects: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: string[];
  totalDuration: number;
  difficulty: string;
  category: string;
}

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [learningModules, setLearningModules] = useState<LearningModule[]>([
    {
      id: '1',
      title: 'Understanding Climate Change',
      description: 'Learn about the science behind climate change, its impacts, and solutions',
      category: 'Environment',
      difficulty: 'Beginner',
      duration: 45,
      isCompleted: true,
      progress: 100,
      points: 100,
      topics: ['Greenhouse Effect', 'Carbon Footprint', 'Renewable Energy', 'Climate Solutions'],
      resources: [
        { type: 'video', title: 'Climate Science Basics', url: '#' },
        { type: 'interactive', title: 'Carbon Footprint Calculator', url: '#' },
        { type: 'quiz', title: 'Climate Knowledge Test', url: '#' }
      ],
      impact: 'Understanding climate change helps you make informed decisions about environmental projects',
      relatedProjects: ['Mangrove Restoration', 'Solar Energy Initiative']
    },
    {
      id: '2',
      title: 'Global Poverty & Inequality',
      description: 'Explore the root causes of poverty and effective strategies for reducing inequality',
      category: 'Social Impact',
      difficulty: 'Intermediate',
      duration: 60,
      isCompleted: false,
      progress: 65,
      points: 150,
      topics: ['Poverty Measurement', 'Economic Inequality', 'Social Safety Nets', 'Microfinance'],
      resources: [
        { type: 'article', title: 'Poverty Statistics Worldwide', url: '#' },
        { type: 'video', title: 'Success Stories in Poverty Reduction', url: '#' },
        { type: 'interactive', title: 'Poverty Simulation', url: '#' }
      ],
      impact: 'Knowledge about poverty helps you support the most effective anti-poverty initiatives',
      relatedProjects: ['Education for All', 'Microfinance Program']
    },
    {
      id: '3',
      title: 'Water Crisis & Solutions',
      description: 'Understand global water challenges and innovative solutions for water security',
      category: 'Environment',
      difficulty: 'Beginner',
      duration: 30,
      isCompleted: true,
      progress: 100,
      points: 75,
      topics: ['Water Scarcity', 'Water Quality', 'Conservation', 'Innovation'],
      resources: [
        { type: 'video', title: 'Global Water Crisis Explained', url: '#' },
        { type: 'interactive', title: 'Water Usage Calculator', url: '#' },
        { type: 'article', title: 'Water Innovation Technologies', url: '#' }
      ],
      impact: 'Understanding water issues helps you support projects that provide clean water access',
      relatedProjects: ['Clean Water Initiative', 'Water Conservation Project']
    },
    {
      id: '4',
      title: 'Education Systems & Access',
      description: 'Learn about educational inequalities and strategies for improving global education',
      category: 'Education',
      difficulty: 'Intermediate',
      duration: 50,
      isCompleted: false,
      progress: 20,
      points: 125,
      topics: ['Educational Access', 'Quality Education', 'Digital Divide', 'Teacher Training'],
      resources: [
        { type: 'video', title: 'Education Around the World', url: '#' },
        { type: 'interactive', title: 'Education Impact Simulator', url: '#' },
        { type: 'quiz', title: 'Education Knowledge Check', url: '#' }
      ],
      impact: 'Understanding education challenges helps you support effective learning initiatives',
      relatedProjects: ['Digital Literacy Program', 'Teacher Training Initiative']
    },
    {
      id: '5',
      title: 'Sustainable Development Goals',
      description: 'Comprehensive overview of the UN SDGs and how to contribute to achieving them',
      category: 'Global Issues',
      difficulty: 'Advanced',
      duration: 90,
      isCompleted: false,
      progress: 0,
      points: 200,
      topics: ['17 SDGs', 'Interconnected Goals', 'Measurement', 'Implementation'],
      resources: [
        { type: 'video', title: 'SDGs Explained', url: '#' },
        { type: 'interactive', title: 'SDG Progress Tracker', url: '#' },
        { type: 'article', title: 'How to Contribute to SDGs', url: '#' }
      ],
      impact: 'Understanding SDGs helps you align your actions with global development priorities',
      relatedProjects: ['All Projects']
    }
  ]);

  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: '1',
      title: 'Climate Action Path',
      description: 'Complete journey from understanding climate change to taking effective action',
      modules: ['1', '3'],
      totalDuration: 75,
      difficulty: 'Beginner',
      category: 'Environment'
    },
    {
      id: '2',
      title: 'Social Impact Expert',
      description: 'Become an expert in social issues and effective intervention strategies',
      modules: ['2', '4'],
      totalDuration: 110,
      difficulty: 'Intermediate',
      category: 'Social Impact'
    },
    {
      id: '3',
      title: 'Global Citizen',
      description: 'Comprehensive understanding of global challenges and solutions',
      modules: ['1', '2', '3', '4', '5'],
      totalDuration: 275,
      difficulty: 'Advanced',
      category: 'Global Issues'
    }
  ]);

  const categories = ['All', 'Environment', 'Social Impact', 'Education', 'Global Issues'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredModules = learningModules.filter(module => {
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || module.difficulty === selectedDifficulty;
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'article': return '📄';
      case 'interactive': return '🎮';
      case 'quiz': return '❓';
      default: return '📚';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Learning Hub</h1>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Expand your knowledge about global challenges and learn how to make a meaningful impact. 
              Each module is designed to help you understand complex issues and take informed action.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search learning modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <div key={path.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-black mb-2">{path.title}</h3>
                  <p className="text-black/70 mb-4">{path.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-black/60">Duration</span>
                      <span className="text-black">{path.totalDuration} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">Difficulty</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                        {path.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">Modules</span>
                      <span className="text-black">{path.modules.length}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Start Path
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Modules */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">Learning Modules</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredModules.map((module) => (
                <div key={module.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-black">{module.title}</h3>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                        {module.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-black/70 mb-4">{module.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Duration</span>
                      <span className="text-black">{module.duration} minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Points</span>
                      <span className="text-black">{module.points}</span>
                    </div>
                    
                    {!module.isCompleted && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-black/60">Progress</span>
                          <span className="text-black">{module.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {module.isCompleted && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-green-800 font-medium">
                          ✅ Completed - {module.points} points earned
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-black mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-black mb-2">Resources:</h4>
                    <div className="space-y-2">
                      {module.resources.map((resource, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span>{getResourceIcon(resource.type)}</span>
                          <span className="text-black/70">{resource.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-blue-800 font-medium">{module.impact}</p>
                  </div>
                  
                  <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    module.isCompleted 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    {module.isCompleted ? 'Review Module' : 'Start Learning'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Learn and Make a Difference?</h2>
            <p className="text-xl mb-6 opacity-90">
              Knowledge is the first step toward meaningful action. Start your learning journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Browse All Modules
              </button>
              <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors">
                Take Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
