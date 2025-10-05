'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  mission: string;
  category: string;
  coverImage?: string;
  coverVideo?: string;
  goal: number;
  raised: number;
  createdAt: string;
  updatedAt: string;
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          // Fallback data if API is not available
          setProjects([
            {
              id: 'cmg7190um0000sot01ipwupw7',
              title: 'Clean Water Initiative',
              mission: 'Provide sustainable access to clean water.',
              category: 'Health',
              goal: 25000,
              raised: 18420,
              createdAt: '2025-09-30T20:51:31.342Z',
              updatedAt: '2025-09-30T20:51:31.342Z'
            },
            {
              id: 'cmg7190up0001sot0caofthwc',
              title: 'After-school Learning',
              mission: 'Tutoring for underserved students.',
              category: 'Education',
              goal: 15000,
              raised: 8200,
              createdAt: '2025-09-30T20:51:31.345Z',
              updatedAt: '2025-09-30T20:51:31.345Z'
            },
            {
              id: 'cmg7190up0002sot0ssct21aj',
              title: 'Mangrove Restoration',
              mission: 'Restore coastal mangroves for climate resilience.',
              category: 'Climate',
              goal: 30000,
              raised: 12000,
              createdAt: '2025-09-30T20:51:31.346Z',
              updatedAt: '2025-09-30T20:51:31.346Z'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Use fallback data
        setProjects([
          {
            id: 'cmg7190um0000sot01ipwupw7',
            title: 'Clean Water Initiative',
            mission: 'Provide sustainable access to clean water.',
            category: 'Health',
            goal: 25000,
            raised: 18420,
            createdAt: '2025-09-30T20:51:31.342Z',
            updatedAt: '2025-09-30T20:51:31.342Z'
          },
          {
            id: 'cmg7190up0001sot0caofthwc',
            title: 'After-school Learning',
            mission: 'Tutoring for underserved students.',
            category: 'Education',
            goal: 15000,
            raised: 8200,
            createdAt: '2025-09-30T20:51:31.345Z',
            updatedAt: '2025-09-30T20:51:31.345Z'
          },
          {
            id: 'cmg7190up0002sot0ssct21aj',
            title: 'Mangrove Restoration',
            mission: 'Restore coastal mangroves for climate resilience.',
            category: 'Climate',
            goal: 30000,
            raised: 12000,
            createdAt: '2025-09-30T20:51:31.346Z',
            updatedAt: '2025-09-30T20:51:31.346Z'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health': return 'bg-blue-100 text-blue-800';
      case 'Education': return 'bg-green-100 text-green-800';
      case 'Climate': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-black">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  // Landing page for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-black mb-6">
              Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Real Impact</span>
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto mb-8">
              Join the Web3 revolution in nonprofit funding. Discover, support, and track transparent, 
              decentralized initiatives that are changing the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-lg"
              >
                Get Started
              </Link>
              <Link 
                href="/projects" 
                className="bg-white/70 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-white/90 transition-all duration-200 border border-white/20 shadow-lg text-lg"
              >
                Explore Projects
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Transparent</h3>
              <p className="text-black">Every donation is tracked on-chain with complete transparency</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Impact-Focused</h3>
              <p className="text-black">Support verified projects with measurable outcomes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Rewarding</h3>
              <p className="text-black">Earn NFT badges and governance tokens for your contributions</p>
            </div>
          </div>

          {/* Sample Projects Preview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-black text-center mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => {
                const progress = (project.raised / project.goal) * 100;
                
                return (
                  <div key={project.id} className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">🌱</span>
                        </div>
                        <p className="text-sm text-black">Project Cover</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                      <p className="text-black mb-4 line-clamp-2">{project.mission}</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-black mb-1">
                          <span>{Math.round(progress)}% funded</span>
                          <span>${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of changemakers already using ImpactHub</p>
            <Link 
              href="/auth" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 text-lg"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user dashboard
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Continue supporting the causes you care about and discover new opportunities to make an impact.
            </p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-black">Your Impact</h3>
              <p className="text-3xl font-bold text-blue-600">${user?.totalDonated?.toLocaleString() || '0'}</p>
              <p className="text-sm text-black">Total Donated</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-black">Projects</h3>
              <p className="text-3xl font-bold text-green-600">{user?.projectsSupported || 0}</p>
              <p className="text-sm text-black">Supported</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-black">Badges</h3>
              <p className="text-3xl font-bold text-purple-600">{user?.nftBadges || 0}</p>
              <p className="text-sm text-black">NFT Badges</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-black">Role</h3>
              <p className="text-lg font-bold text-orange-600">{user?.role?.replace('_', ' ').toUpperCase()}</p>
              <p className="text-sm text-black">Your Role</p>
            </div>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-black">Total Raised</h3>
              <p className="text-3xl font-bold text-blue-600">$38,620</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-black">Active Projects</h3>
              <p className="text-3xl font-bold text-green-600">3</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-black">This Month</h3>
              <p className="text-3xl font-bold text-purple-600">—</p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">Featured Projects</h2>
              <Link 
                href="/projects" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => {
                const progress = (project.raised / project.goal) * 100;
                
                return (
                  <div key={project.id} className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    {/* Project Cover */}
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">🌱</span>
                        </div>
                        <p className="text-sm text-black">Project Cover</p>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                      <p className="text-black mb-4 line-clamp-2">{project.mission}</p>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-black mb-1">
                          <span>{Math.round(progress)}% funded</span>
                          <span>${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link 
                          href={`/projects/${project.id}`}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center"
                        >
                          View Details
                        </Link>
                        <button className="bg-white/50 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-white/70 transition-all duration-200 border border-gray-200">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}