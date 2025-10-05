'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

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
  tasks?: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    assignee?: string;
    dueDate?: string;
    progress: number;
  }>;
  timeline?: Array<{
    id: string;
    title: string;
    status: string;
    milestone: boolean;
    startDate: string;
    endDate: string;
  }>;
  reports?: Array<{
    id: string;
    title: string;
    content: string;
    reportType: string;
    metrics: Record<string, unknown>;
    attachments: string[];
    createdBy: string;
    createdAt: string;
  }>;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'management'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Environment', 'Health', 'Education', 'Social Impact', 'Technology'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3001/projects');
        if (response.ok) {
          const data = await response.json();
          // Add project management data to each project
          const enhancedData = data.map((project: Project) => ({
            ...project,
            tasks: [
              {
                id: `${project.id}_task_1`,
                title: 'Project setup and planning',
                status: 'COMPLETED',
                priority: 'HIGH',
                assignee: 'Project Manager',
                dueDate: '2025-01-10',
                progress: 100
              },
              {
                id: `${project.id}_task_2`,
                title: 'Resource allocation',
                status: 'IN_PROGRESS',
                priority: 'MEDIUM',
                assignee: 'Resource Manager',
                dueDate: '2025-02-15',
                progress: 75
              }
            ],
            timeline: [
              {
                id: `${project.id}_timeline_1`,
                title: 'Project Kickoff',
                status: 'COMPLETED',
                milestone: true,
                startDate: '2025-01-01',
                endDate: '2025-01-15'
              },
              {
                id: `${project.id}_timeline_2`,
                title: 'First Milestone',
                status: 'PLANNED',
                milestone: true,
                startDate: '2025-03-15',
                endDate: '2025-03-20'
              }
            ],
            reports: [
              {
                id: `${project.id}_report_1`,
                title: 'Monthly Progress Report',
                content: 'Project is progressing well with initial milestones completed.',
                reportType: 'PROGRESS',
                metrics: { milestonesCompleted: 2, progressRate: 60, teamSize: 5 },
                attachments: ['monthly_summary.pdf', 'team_photos.pdf'],
                createdBy: 'Project Manager',
                createdAt: '2025-01-15'
              }
            ]
          }));
          setProjects(enhancedData);
        } else {
          // Fallback data if API is not available
          setProjects([
            {
              id: 'cmg7190up0002sot0ssct21aj',
              title: 'Mangrove Restoration',
              mission: 'Restore coastal mangroves for climate resilience.',
              category: 'Climate',
              goal: 30000,
              raised: 12000,
              createdAt: '2025-09-30T20:51:31.342Z',
              updatedAt: '2025-09-30T20:51:31.342Z',
              tasks: [
                {
                  id: 'task_1',
                  title: 'Site Assessment',
                  status: 'COMPLETED',
                  priority: 'HIGH',
                  assignee: 'Environmental Engineer',
                  dueDate: '2025-01-15',
                  progress: 100
                },
                {
                  id: 'task_2',
                  title: 'Seedling Procurement',
                  status: 'IN_PROGRESS',
                  priority: 'MEDIUM',
                  assignee: 'Procurement Manager',
                  dueDate: '2025-02-28',
                  progress: 60
                }
              ],
              timeline: [
                {
                  id: 'timeline_1',
                  title: 'Project Launch',
                  status: 'COMPLETED',
                  milestone: true,
                  startDate: '2025-01-01',
                  endDate: '2025-01-15'
                },
                {
                  id: 'timeline_2',
                  title: 'First Planting Phase',
                  status: 'PLANNED',
                  milestone: true,
                  startDate: '2025-03-01',
                  endDate: '2025-03-15'
                }
              ],
              reports: [
                  {
                    id: 'report_1',
                    title: 'Q1 Progress Report',
                    content: 'Site assessment completed, seedling procurement in progress.',
                    reportType: 'PROGRESS',
                    metrics: { completionRate: 75, treesPlanted: 150, areaRestored: 2.5 },
                    attachments: ['progress_photos.pdf', 'environmental_assessment.pdf'],
                    createdBy: 'Marine Biology Team',
                    createdAt: '2025-01-15'
                  }
              ]
            },
            {
              id: 'cmg7190up0001sot0caofthwc',
              title: 'After-school Learning',
              mission: 'Tutoring for underserved students.',
              category: 'Education',
              goal: 15000,
              raised: 8200,
              createdAt: '2025-09-30T20:51:31.342Z',
              updatedAt: '2025-09-30T20:51:31.342Z',
              tasks: [
                {
                  id: 'task_3',
                  title: 'Curriculum Development',
                  status: 'COMPLETED',
                  priority: 'HIGH',
                  assignee: 'Education Coordinator',
                  dueDate: '2025-01-10',
                  progress: 100
                },
                {
                  id: 'task_4',
                  title: 'Volunteer Recruitment',
                  status: 'IN_PROGRESS',
                  priority: 'MEDIUM',
                  assignee: 'Volunteer Manager',
                  dueDate: '2025-02-15',
                  progress: 80
                }
              ],
              timeline: [
                {
                  id: 'timeline_3',
                  title: 'Program Launch',
                  status: 'COMPLETED',
                  milestone: true,
                  startDate: '2025-01-01',
                  endDate: '2025-01-10'
                },
                {
                  id: 'timeline_4',
                  title: 'First Student Cohort',
                  status: 'PLANNED',
                  milestone: true,
                  startDate: '2025-02-01',
                  endDate: '2025-02-15'
                }
              ],
              reports: [
                {
                  id: 'report_2',
                  title: 'Program Launch Report',
                  content: 'Curriculum developed, volunteer recruitment in progress.',
                  reportType: 'PROGRESS',
                  metrics: { studentsEnrolled: 25, volunteersRecruited: 8, curriculumModules: 12 },
                  attachments: ['curriculum_outline.pdf', 'volunteer_handbook.pdf'],
                  createdBy: 'Education Team',
                  createdAt: '2025-01-10'
                }
              ]
            },
            {
              id: 'cmg7190um0000sot01ipwupw7',
              title: 'Clean Water Initiative',
              mission: 'Provide sustainable access to clean water.',
              category: 'Health',
              goal: 25000,
              raised: 18420,
              createdAt: '2025-09-30T20:51:31.342Z',
              updatedAt: '2025-09-30T20:51:31.342Z',
              tasks: [
                {
                  id: 'task_5',
                  title: 'Water Source Analysis',
                  status: 'COMPLETED',
                  priority: 'HIGH',
                  assignee: 'Water Engineer',
                  dueDate: '2025-01-05',
                  progress: 100
                },
                {
                  id: 'task_6',
                  title: 'Infrastructure Planning',
                  status: 'IN_PROGRESS',
                  priority: 'HIGH',
                  assignee: 'Infrastructure Manager',
                  dueDate: '2025-02-20',
                  progress: 70
                }
              ],
              timeline: [
                {
                  id: 'timeline_5',
                  title: 'Project Initiation',
                  status: 'COMPLETED',
                  milestone: true,
                  startDate: '2025-01-01',
                  endDate: '2025-01-05'
                },
                {
                  id: 'timeline_6',
                  title: 'Construction Phase',
                  status: 'PLANNED',
                  milestone: true,
                  startDate: '2025-03-01',
                  endDate: '2025-03-15'
                }
              ],
              reports: [
                {
                  id: 'report_3',
                  title: 'Initial Assessment Report',
                  content: 'Water source analysis completed, infrastructure planning in progress.',
                  reportType: 'PROGRESS',
                  metrics: { waterSourcesAnalyzed: 5, communitiesAssessed: 3, infrastructurePlanned: 2 },
                  attachments: ['water_quality_report.pdf', 'infrastructure_plan.pdf'],
                  createdBy: 'Water Engineering Team',
                  createdAt: '2025-01-05'
                }
              ]
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Use fallback data
        setProjects([
          {
            id: 'cmg7190up0002sot0ssct21aj',
            title: 'Mangrove Restoration',
            mission: 'Restore coastal mangroves for climate resilience.',
            category: 'Climate',
            goal: 30000,
            raised: 12000,
            createdAt: '2025-09-30T20:51:31.342Z',
            updatedAt: '2025-09-30T20:51:31.342Z',
            tasks: [],
            timeline: [],
            reports: []
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const totalRaised = projects.reduce((sum, project) => sum + project.raised, 0);
  const uniqueCategories = [...new Set(projects.map(project => project.category))];
  const completedTasks = projects.reduce((sum, project) => 
    sum + (project.tasks?.filter(task => task.status === 'COMPLETED').length || 0), 0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'PLANNED': return 'bg-gray-100 text-gray-800';
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-black">Loading projects...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
              {viewMode === 'grid' ? 'Discover Projects' : 'Project Management'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {viewMode === 'grid' 
                ? 'Support impactful initiatives and track their progress with transparent, decentralized funding'
                : 'Manage project tasks, timelines, and reports with comprehensive project management tools'
              }
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex justify-center mb-12">
            <div className="card p-1 shadow-xl border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ripple-effect ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl">📊</span>
                  <span>Project Grid</span>
                </span>
              </button>
              <button
                onClick={() => setViewMode('management')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ripple-effect ${
                  viewMode === 'management'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl">🗺️</span>
                  <span>Management View</span>
                </span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="card text-center hover-lift group cursor-pointer color-splash-primary">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">{projects.length}</div>
              <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 font-medium">Total Projects</div>
            </div>
            <div className="card text-center hover-lift group cursor-pointer color-splash-accent">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💰</div>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-2">${totalRaised.toLocaleString()}</div>
              <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 font-medium">Total Raised</div>
            </div>
            <div className="card text-center hover-lift group cursor-pointer color-splash-primary">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">✅</div>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 mb-2">{completedTasks}</div>
              <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 font-medium">Completed Tasks</div>
            </div>
            <div className="card text-center hover-lift group cursor-pointer color-splash-accent">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📈</div>
              <div className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 mb-2">{uniqueCategories.length}</div>
              <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 font-medium">Categories</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center flex-wrap gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ripple-effect ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'
                }`}
              >
                <span className="relative flex items-center space-x-2">
                  <span>{category}</span>
                  {selectedCategory === category && (
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-stagger">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="card overflow-hidden hover-lift group cursor-pointer masked-reveal-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-56 bg-gradient-to-br from-blue-500 to-purple-500 overflow-hidden group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-7xl group-hover:scale-110 transition-transform duration-500 animate-float">🌍</div>
                    </div>
                    <div className="absolute top-4 left-4 transform group-hover:scale-105 transition-transform duration-300">
                      <span className="bg-white/95 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 transform group-hover:scale-105 transition-transform duration-300">
                      <span className="bg-white/95 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                        {Math.round((project.raised / project.goal) * 100)}% Complete
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{project.mission}</p>
                    
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 font-medium">Progress</span>
                        <span className="font-bold text-gray-900">{Math.round((project.raised / project.goal) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="progress-bar h-3 rounded-full transition-all duration-500"
                          style={{ width: `${Math.round((project.raised / project.goal) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <div>
                        <span className="text-gray-600">Raised</span>
                        <span className="ml-1 font-medium text-black">${project.raised.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Goal</span>
                        <span className="ml-1 font-medium text-black">${project.goal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Project Management Quick Stats */}
                    {project.tasks && project.tasks.length > 0 && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-semibold text-black mb-2">Project Management</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Tasks:</span>
                            <span className="ml-1 font-medium text-black">{project.tasks.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Timeline:</span>
                            <span className="ml-1 font-medium text-black">{project.timeline?.length || 0}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Link
                        href={`/projects/${project.id}`}
                        className="btn-primary flex-1 text-center ripple-effect group"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <span>View Details</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                      </Link>
                      <button className="btn-secondary ripple-effect group">
                        <span className="flex items-center space-x-2">
                          <span>Share</span>
                          <span className="group-hover:scale-110 transition-transform duration-300">📤</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Management View */}
          {viewMode === 'management' && (
            <div className="space-y-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-black">{project.title}</h3>
                      <p className="text-gray-700">{project.mission}</p>
                    </div>
                    <div className="flex space-x-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {Math.round((project.raised / project.goal) * 100)}% Complete
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Funding Progress</div>
                      <div className="text-lg font-bold text-black">${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Tasks</div>
                      <div className="text-lg font-bold text-black">{project.tasks?.length || 0}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Active Tasks</div>
                      <div className="text-lg font-bold text-black">{project.tasks?.filter(task => task.status === 'IN_PROGRESS').length || 0}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Milestones</div>
                      <div className="text-lg font-bold text-black">{project.timeline?.filter(event => event.milestone).length || 0}</div>
                    </div>
                  </div>

                  {/* Tasks */}
                  {project.tasks && project.tasks.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-black mb-4">Active Tasks</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.tasks.map((task) => (
                          <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-black">{task.title}</h5>
                              <div className="flex space-x-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                                  {task.status}
                                </span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              Assignee: {task.assignee} | Due: {task.dueDate}
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium text-black">{task.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  {project.timeline && project.timeline.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-black mb-4">Project Timeline</h4>
                      <div className="space-y-3">
                        {project.timeline.map((event) => (
                          <div key={event.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <div className={`w-3 h-3 rounded-full ${event.milestone ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                            <div className="flex-1">
                              <h5 className="font-medium text-black">{event.title}</h5>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                                  {event.status}
                                </span>
                                <span>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}