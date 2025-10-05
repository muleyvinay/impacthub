'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface ImpactData {
  totalDonations: number;
  projectsFunded: number;
  livesImpacted: number;
  countriesReached: number;
  carbonFootprintReduced: number;
  educationHoursProvided: number;
  waterAccessProvided: number;
  healthcareAccessProvided: number;
}

interface GlobalProblem {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  affectedPopulation: number;
  currentFunding: number;
  neededFunding: number;
  progress: number;
  impact: string;
  learnMore: string;
}

export default function ImpactPage() {
  const [impactData, setImpactData] = useState<ImpactData>({
    totalDonations: 2840000,
    projectsFunded: 156,
    livesImpacted: 125000,
    countriesReached: 47,
    carbonFootprintReduced: 2500,
    educationHoursProvided: 45000,
    waterAccessProvided: 89000,
    healthcareAccessProvided: 34000,
  });

  const [globalProblems, setGlobalProblems] = useState<GlobalProblem[]>([
    {
      id: '1',
      title: 'Climate Change',
      description: 'Global warming and environmental degradation affecting millions worldwide',
      severity: 'Critical',
      category: 'Environment',
      affectedPopulation: 8000000000,
      currentFunding: 45000000,
      neededFunding: 200000000,
      progress: 22.5,
      impact: 'Every $100 helps plant 10 trees and reduce 1 ton of CO2',
      learnMore: 'Climate change affects weather patterns, sea levels, and ecosystems globally'
    },
    {
      id: '2',
      title: 'Global Hunger',
      description: 'Over 800 million people face chronic hunger worldwide',
      severity: 'Critical',
      category: 'Food Security',
      affectedPopulation: 800000000,
      currentFunding: 12000000,
      neededFunding: 50000000,
      progress: 24,
      impact: 'Every $50 provides nutritious meals for a family for one month',
      learnMore: 'Hunger affects cognitive development, productivity, and life expectancy'
    },
    {
      id: '3',
      title: 'Access to Clean Water',
      description: '2.2 billion people lack access to safely managed drinking water',
      severity: 'High',
      category: 'Health',
      affectedPopulation: 2200000000,
      currentFunding: 8500000,
      neededFunding: 35000000,
      progress: 24.3,
      impact: 'Every $25 provides clean water access for one person for a year',
      learnMore: 'Water scarcity leads to disease, conflict, and economic instability'
    },
    {
      id: '4',
      title: 'Education Inequality',
      description: '258 million children and youth are out of school globally',
      severity: 'High',
      category: 'Education',
      affectedPopulation: 258000000,
      currentFunding: 18000000,
      neededFunding: 60000000,
      progress: 30,
      impact: 'Every $100 provides school supplies and education for one child',
      learnMore: 'Education is the foundation for breaking cycles of poverty and inequality'
    }
  ]);

  const [selectedProblem, setSelectedProblem] = useState<GlobalProblem | null>(null);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Global Impact Dashboard</h1>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Explore real-time data on global challenges and see how your contributions make a difference. 
              Learn about the world&apos;s most pressing problems and discover ways to help solve them.
            </p>
          </div>

          {/* Impact Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-green-600 mb-2">${(impactData.totalDonations / 1000000).toFixed(1)}M</div>
              <div className="text-black/70">Total Donations</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">{impactData.projectsFunded}</div>
              <div className="text-black/70">Projects Funded</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">{(impactData.livesImpacted / 1000).toFixed(0)}K</div>
              <div className="text-black/70">Lives Impacted</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-orange-600 mb-2">{impactData.countriesReached}</div>
              <div className="text-black/70">Countries Reached</div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">Environmental Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{impactData.carbonFootprintReduced} tons</div>
                <div className="text-black/70">CO₂ Reduced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{impactData.waterAccessProvided.toLocaleString()}</div>
                <div className="text-black/70">People with Clean Water</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">{impactData.educationHoursProvided.toLocaleString()}</div>
                <div className="text-black/70">Education Hours Provided</div>
              </div>
            </div>
          </div>

          {/* Global Problems Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">Global Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {globalProblems.map((problem) => (
                <div 
                  key={problem.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedProblem(problem)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-black">{problem.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      problem.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      problem.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      problem.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {problem.severity}
                    </span>
                  </div>
                  
                  <p className="text-black/70 mb-4">{problem.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Affected Population</span>
                      <span className="font-medium text-black">{(problem.affectedPopulation / 1000000).toFixed(1)}M people</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Progress</span>
                      <span className="font-medium text-black">{problem.progress}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${problem.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Funding</span>
                      <span className="font-medium text-black">
                        ${(problem.currentFunding / 1000000).toFixed(1)}M / ${(problem.neededFunding / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium">{problem.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Detail Modal */}
          {selectedProblem && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-black">{selectedProblem.title}</h3>
                  <button 
                    onClick={() => setSelectedProblem(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-black mb-2">Problem Description</h4>
                    <p className="text-black/70">{selectedProblem.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-black mb-2">Why This Matters</h4>
                    <p className="text-black/70">{selectedProblem.learnMore}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-black/60">Affected Population</div>
                      <div className="text-xl font-bold text-black">{(selectedProblem.affectedPopulation / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-black/60">Current Progress</div>
                      <div className="text-xl font-bold text-black">{selectedProblem.progress}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">Your Impact</h4>
                    <p className="text-blue-700">{selectedProblem.impact}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Learn More
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Take Action
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of people who are already making an impact on global challenges
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Explore Projects
              </button>
              <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
