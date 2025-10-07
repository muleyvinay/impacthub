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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 animate-bounce-in">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Live Impact Tracking
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 leading-tight">
              Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">Real Impact</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
              Join the Web3 revolution in nonprofit funding. Discover, support, and track transparent, 
              decentralized initiatives that are changing the world with blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/auth" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 ripple-effect"
              >
                <span className="flex items-center space-x-3">
                  <span>Get Started</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                </span>
              </Link>
              <Link 
                href="/projects" 
                className="group bg-white/80 backdrop-blur-sm text-gray-700 px-10 py-5 rounded-2xl font-semibold hover:bg-white/90 transition-all duration-300 border border-white/30 shadow-xl hover:shadow-2xl text-lg transform hover:scale-105"
              >
                <span className="flex items-center space-x-3">
                  <span>Explore Projects</span>
                  <span className="group-hover:rotate-12 transition-transform duration-300">🔍</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 grid-stagger">
            <div className="group text-center hover-lift cursor-pointer color-splash-primary">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-3xl group-hover:animate-wiggle">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-blue-600 transition-colors duration-300">Transparent</h3>
              <p className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                Every donation is tracked on-chain with complete transparency and immutable records
              </p>
            </div>
            <div className="group text-center hover-lift cursor-pointer color-splash-accent">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-3xl group-hover:animate-wiggle">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-green-600 transition-colors duration-300">Impact-Focused</h3>
              <p className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                Support verified projects with measurable outcomes and real-world impact
              </p>
            </div>
            <div className="group text-center hover-lift cursor-pointer color-splash-primary">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-3xl group-hover:animate-wiggle">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-purple-600 transition-colors duration-300">Rewarding</h3>
              <p className="text-gray-700 text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                Earn NFT badges and governance tokens for your contributions and impact
              </p>
            </div>
          </div>

          {/* Sample Projects Preview */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">Featured Projects</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover impactful initiatives making a real difference in communities worldwide
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 grid-stagger">
              {projects.slice(0, 3).map((project, index) => {
                const progress = (project.raised / project.goal) * 100;
                
                return (
                  <div 
                    key={project.id} 
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer masked-reveal-left"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative h-56 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden group-hover:from-blue-500 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center transform group-hover:scale-110 transition-all duration-500">
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 transition-transform duration-500">
                            <span className="text-4xl animate-float">🌱</span>
                          </div>
                          <p className="text-white/90 font-medium">Project Impact</p>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 transform group-hover:scale-105 transition-transform duration-300">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 transform group-hover:scale-105 transition-transform duration-300">
                        <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                          {Math.round(progress)}% Complete
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>
                    <div className="p-8">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                        <p className="text-gray-700 leading-relaxed line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">{project.mission}</p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-gray-600 font-medium">Funding Progress</span>
                          <span className="font-bold text-black">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="progress-bar h-3 rounded-full transition-all duration-700"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>${project.raised.toLocaleString()}</span>
                          <span>${project.goal.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Link
                          href={`/projects/${project.id}`}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center ripple-effect group"
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <span>View Details</span>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                          </span>
                        </Link>
                        <button className="bg-white/50 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-white/70 transition-all duration-300 border border-gray-200 hover:border-gray-300 group">
                          <span className="flex items-center space-x-2">
                            <span>Share</span>
                            <span className="group-hover:scale-110 transition-transform duration-300">📤</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Stats */}
          <div className="mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-black mb-4">Live Impact Dashboard</h3>
                <p className="text-gray-600 text-lg">Real-time statistics from our global community</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:animate-pulse">$2.4M</div>
                  <div className="text-gray-600 font-medium">Total Raised</div>
                  <div className="text-sm text-green-600 mt-1">+12% this month</div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-green-600 mb-2 group-hover:animate-pulse">1,247</div>
                  <div className="text-gray-600 font-medium">Active Projects</div>
                  <div className="text-sm text-green-600 mt-1">+8% this month</div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:animate-pulse">15.2K</div>
                  <div className="text-gray-600 font-medium">Community Members</div>
                  <div className="text-sm text-green-600 mt-1">+23% this month</div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-orange-600 mb-2 group-hover:animate-pulse">89%</div>
                  <div className="text-gray-600 font-medium">Success Rate</div>
                  <div className="text-sm text-green-600 mt-1">+3% this month</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of changemakers already using ImpactHub to create lasting positive change
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                  href="/auth" 
                  className="group bg-white text-blue-600 px-10 py-5 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 ripple-effect"
                >
                  <span className="flex items-center space-x-3">
                    <span>Start Your Journey</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                  </span>
                </Link>
                <Link 
                  href="/projects" 
                  className="group bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 text-lg border border-white/30 hover:border-white/50 transform hover:scale-105"
                >
                  <span className="flex items-center space-x-3">
                    <span>Explore Projects</span>
                    <span className="group-hover:rotate-12 transition-transform duration-300">🔍</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user dashboard
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Welcome Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 animate-bounce-in">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Welcome back!
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{user?.name}</span>! 👋
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Continue supporting the causes you care about and discover new opportunities to make an impact.
            </p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 grid-stagger">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer color-splash-primary">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-sm text-green-600 font-semibold group-hover:animate-pulse">+5% this month</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-300">Your Impact</h3>
              <p className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">${user?.totalDonated?.toLocaleString() || '0'}</p>
              <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Total Donated</p>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer color-splash-accent">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-sm text-green-600 font-semibold group-hover:animate-pulse">+2 this month</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-green-600 transition-colors duration-300">Projects</h3>
              <p className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">{user?.projectsSupported || 0}</p>
              <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Supported</p>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer color-splash-primary">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏆</span>
                </div>
                <span className="text-sm text-green-600 font-semibold group-hover:animate-pulse">+1 this month</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-purple-600 transition-colors duration-300">Badges</h3>
              <p className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">{user?.nftBadges || 0}</p>
              <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">NFT Badges</p>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer color-splash-accent">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">👤</span>
                </div>
                <span className="text-sm text-green-600 font-semibold group-hover:animate-pulse">Active</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-orange-600 transition-colors duration-300">Role</h3>
              <p className="text-2xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">{user?.role?.replace('_', ' ').toUpperCase()}</p>
              <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Your Role</p>
            </div>
          </div>

          {/* Global Stats */}
          <div className="mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-black mb-4">Global Impact Dashboard</h3>
                <p className="text-gray-600 text-lg">Real-time statistics from our community</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Total Raised</h3>
                  <p className="text-4xl font-bold text-blue-600 mb-2 group-hover:animate-pulse">$2.4M</p>
                  <p className="text-sm text-green-600 font-semibold">+12% this month</p>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Active Projects</h3>
                  <p className="text-4xl font-bold text-green-600 mb-2 group-hover:animate-pulse">1,247</p>
                  <p className="text-sm text-green-600 font-semibold">+8% this month</p>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Global Reach</h3>
                  <p className="text-4xl font-bold text-purple-600 mb-2 group-hover:animate-pulse">89%</p>
                  <p className="text-sm text-green-600 font-semibold">Success Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-black mb-2">Featured Projects</h2>
                <p className="text-gray-600 text-lg">Discover impactful initiatives you can support</p>
              </div>
              <Link 
                href="/projects" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 ripple-effect"
              >
                <span className="flex items-center space-x-3">
                  <span>View All</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-stagger">
              {projects.map((project, index) => {
                const progress = (project.raised / project.goal) * 100;
                
                return (
                  <div 
                    key={project.id} 
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer masked-reveal-left"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Project Cover */}
                    <div className="relative h-56 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden group-hover:from-blue-500 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center transform group-hover:scale-110 transition-all duration-500">
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 transition-transform duration-500">
                            <span className="text-4xl animate-float">🌱</span>
                          </div>
                          <p className="text-white/90 font-medium">Project Impact</p>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 transform group-hover:scale-105 transition-transform duration-300">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 transform group-hover:scale-105 transition-transform duration-300">
                        <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                          {Math.round(progress)}% Complete
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>

                    {/* Project Info */}
                    <div className="p-8">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                        <p className="text-gray-700 leading-relaxed line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">{project.mission}</p>
                      </div>

                      {/* Progress */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-gray-600 font-medium">Funding Progress</span>
                          <span className="font-bold text-black">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="progress-bar h-3 rounded-full transition-all duration-700"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>${project.raised.toLocaleString()}</span>
                          <span>${project.goal.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-3">
                        <Link 
                          href={`/projects/${project.id}`}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center ripple-effect group"
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <span>View Details</span>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                          </span>
                        </Link>
                        <button className="bg-white/50 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-white/70 transition-all duration-300 border border-gray-200 hover:border-gray-300 group">
                          <span className="flex items-center space-x-2">
                            <span>Share</span>
                            <span className="group-hover:scale-110 transition-transform duration-300">📤</span>
                          </span>
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