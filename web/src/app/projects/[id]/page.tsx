'use client';

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

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
  milestones: Array<{
    id: string;
    title: string;
    amount: number;
    dueDate?: string;
    released: boolean;
  }>;
  updates: Array<{
    id: string;
    content: string;
    mediaUrl?: string;
    mediaType?: string;
    createdAt: string;
  }>;
  tasks?: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee?: string;
    dueDate?: string;
    progress: number;
    startDate?: string;
    endDate?: string;
  }>;
  timeline?: Array<{
    id: string;
    title: string;
    description: string;
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

// Static project data for demo with project management features
const getProjectData = (id: string): Project => {
  const projects = {
    'cmg7190up0002sot0ssct21aj': {
      id: 'cmg7190up0002sot0ssct21aj',
      title: 'Mangrove Restoration',
      mission: 'Restore coastal mangroves for climate resilience.',
      category: 'Climate',
      goal: 30000,
      raised: 12000,
      createdAt: '2025-09-30T20:51:31.346Z',
      milestones: [
        { id: '1', title: 'Site Assessment', amount: 8000, dueDate: '2025-02-15', released: true },
        { id: '2', title: 'Seedling Procurement', amount: 12000, dueDate: '2025-03-30', released: false },
        { id: '3', title: 'Planting Phase', amount: 10000, dueDate: '2025-05-15', released: false }
      ],
      updates: [
        { id: '1', content: 'Initial site assessment completed successfully', createdAt: '2025-01-15' },
        { id: '2', content: 'Seedling procurement in progress', createdAt: '2025-01-10' }
      ],
      tasks: [
        {
          id: 'roadmap_1',
          title: 'Phase 1: Site Preparation',
          description: 'Prepare the mangrove restoration site for planting',
          status: 'IN_PROGRESS',
          progress: 75,
          priority: 'HIGH',
          assignee: 'Marine Biology Team',
          dueDate: '2025-02-15',
          startDate: '2025-01-01',
          endDate: '2025-02-15'
        },
        {
          id: 'roadmap_2',
          title: 'Phase 2: Planting & Restoration',
          description: 'Plant mangrove seedlings and establish restoration zones',
          status: 'PLANNED',
          progress: 0,
          priority: 'HIGH',
          assignee: 'Restoration Team',
          dueDate: '2025-05-15',
          startDate: '2025-03-01',
          endDate: '2025-05-15'
        }
      ],
      timeline: [
        {
          id: 'timeline_1',
          title: 'Project Launch',
          description: 'Official project launch and team assembly',
          status: 'COMPLETED',
          milestone: true,
          startDate: '2025-01-01',
          endDate: '2025-01-15'
        },
        {
          id: 'timeline_2',
          title: 'First Planting Phase',
          description: 'Initial mangrove seedling planting and establishment',
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
    'cmg7190up0001sot0caofthwc': {
      id: 'cmg7190up0001sot0caofthwc',
      title: 'After-school Learning',
      mission: 'Tutoring for underserved students.',
      category: 'Education',
      goal: 15000,
      raised: 8200,
      createdAt: '2025-09-30T20:51:31.342Z',
      milestones: [
        { id: '1', title: 'Curriculum Development', amount: 5000, dueDate: '2025-02-01', released: true },
        { id: '2', title: 'Volunteer Training', amount: 3000, dueDate: '2025-02-15', released: false },
        { id: '3', title: 'Program Launch', amount: 7000, dueDate: '2025-03-01', released: false }
      ],
      updates: [
        { id: '1', content: 'Curriculum development completed', createdAt: '2025-01-20' },
        { id: '2', content: 'Volunteer recruitment completed', createdAt: '2025-01-05' }
      ],
      tasks: [
        {
          id: 'roadmap_3',
          title: 'Phase 1: Material Development',
          description: 'Develop educational materials and curriculum for the program',
          status: 'COMPLETED',
          progress: 100,
          priority: 'HIGH',
          assignee: 'Curriculum Team',
          dueDate: '2025-01-20',
          startDate: '2025-01-01',
          endDate: '2025-01-20'
        },
        {
          id: 'roadmap_4',
          title: 'Phase 2: Training Implementation',
          description: 'Implement training programs for volunteers and students',
          status: 'PLANNED',
          progress: 0,
          priority: 'HIGH',
          assignee: 'Training Team',
          dueDate: '2025-02-15',
          startDate: '2025-02-01',
          endDate: '2025-02-15'
        }
      ],
      timeline: [
        {
          id: 'timeline_3',
          title: 'Program Launch',
          description: 'Educational program launch and curriculum development',
          status: 'COMPLETED',
          milestone: true,
          startDate: '2025-01-01',
          endDate: '2025-01-10'
        },
        {
          id: 'timeline_4',
          title: 'First Student Cohort',
          description: 'First group of students enrolled in the program',
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
    'cmg7190um0000sot01ipwupw7': {
      id: 'cmg7190um0000sot01ipwupw7',
      title: 'Clean Water Initiative',
      mission: 'Provide sustainable access to clean water.',
      category: 'Health',
      goal: 25000,
      raised: 18420,
      createdAt: '2025-09-30T20:51:31.342Z',
      milestones: [
        { id: '1', title: 'Water Source Analysis', amount: 5000, dueDate: '2025-01-31', released: true },
        { id: '2', title: 'Infrastructure Planning', amount: 8000, dueDate: '2025-02-28', released: false },
        { id: '3', title: 'Construction Phase', amount: 12000, dueDate: '2025-04-30', released: false }
      ],
      updates: [
        { id: '1', content: 'Water source analysis completed', createdAt: '2025-01-25' },
        { id: '2', content: 'Community training sessions scheduled', createdAt: '2025-01-10' }
      ],
      tasks: [
        {
          id: 'roadmap_5',
          title: 'Phase 1: Infrastructure Setup',
          description: 'Set up water infrastructure and distribution systems',
          status: 'IN_PROGRESS',
          progress: 60,
          priority: 'HIGH',
          assignee: 'Infrastructure Team',
          dueDate: '2025-02-28',
          startDate: '2025-01-01',
          endDate: '2025-02-28'
        },
        {
          id: 'roadmap_6',
          title: 'Phase 2: Community Training',
          description: 'Train community members on water system maintenance',
          status: 'PLANNED',
          progress: 0,
          priority: 'HIGH',
          assignee: 'Community Outreach Team',
          dueDate: '2025-04-30',
          startDate: '2025-03-01',
          endDate: '2025-04-30'
        }
      ],
      timeline: [
        {
          id: 'timeline_5',
          title: 'Project Initiation',
          description: 'Project setup and initial planning phase',
          status: 'COMPLETED',
          milestone: true,
          startDate: '2025-01-01',
          endDate: '2025-01-05'
        },
        {
          id: 'timeline_6',
          title: 'Construction Phase',
          description: 'Main construction and development phase',
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
  };

  return projects[id as keyof typeof projects] || null;
};

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'timeline' | 'reports'>('overview');
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { id } = await params;
        console.log('Fetching project with ID:', id);
        
        const response = await fetch(`http://localhost:3001/projects/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('API response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('API response data:', data);
          
          // Add project management data
          const enhancedData = {
            ...data,
            tasks: [
              {
                id: `${id}_task_1`,
                title: 'Project setup and planning',
                description: 'Initial project setup and planning phase',
                status: 'COMPLETED',
                priority: 'HIGH',
                assignee: 'Project Manager',
                dueDate: '2025-01-10',
                progress: 100,
                startDate: '2025-01-01',
                endDate: '2025-01-10'
              },
              {
                id: `${id}_task_2`,
                title: 'Resource allocation',
                description: 'Allocate resources and budget for project execution',
                status: 'IN_PROGRESS',
                priority: 'MEDIUM',
                assignee: 'Resource Manager',
                dueDate: '2025-02-15',
                progress: 75,
                startDate: '2025-01-15',
                endDate: '2025-02-15'
              }
            ],
            timeline: [
              {
                id: `${id}_timeline_1`,
                title: 'Project Kickoff',
                description: 'Project initiation and team setup',
                status: 'COMPLETED',
                milestone: true,
                startDate: '2025-01-01',
                endDate: '2025-01-15'
              },
              {
                id: `${id}_timeline_2`,
                title: 'First Milestone',
                description: 'First major project milestone achievement',
                status: 'PLANNED',
                milestone: true,
                startDate: '2025-03-15',
                endDate: '2025-03-20'
              }
            ],
            reports: [
              {
                id: `${id}_report_1`,
                title: 'Monthly Progress Report',
                content: 'Project is progressing well with initial milestones completed.',
                reportType: 'PROGRESS',
                metrics: { milestonesCompleted: 2, progressRate: 60, teamSize: 5 },
                attachments: ['monthly_summary.pdf', 'team_photos.pdf'],
                createdBy: 'Project Manager',
                createdAt: '2025-01-15'
              }
            ]
          };
          
          setProject(enhancedData);
        } else {
          console.log('API not available, using fallback data');
          // Use fallback data if API is not available
          const { id } = await params;
          const fallbackProject = getProjectData(id);
          if (fallbackProject) {
            setProject(fallbackProject);
          } else {
            notFound();
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        // Use fallback data
        const { id } = await params;
        const fallbackProject = getProjectData(id);
        if (fallbackProject) {
          setProject(fallbackProject);
        } else {
          notFound();
        }
      } finally {
        setLoading(false);
      }
    };

    // Add timeout to prevent hanging
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('Timeout reached, using fallback data');
        const fetchFallback = async () => {
          const { id } = await params;
          const fallbackProject = getProjectData(id);
          if (fallbackProject) {
            setProject(fallbackProject);
          } else {
            notFound();
          }
          setLoading(false);
        };
        fetchFallback();
      }
    }, 5000);

    fetchProject();
    
    return () => clearTimeout(timeout);
  }, [params, loading]);

  const handleDonate = () => {
    if (donationAmount && parseFloat(donationAmount) > 0) {
      // Simulate donation
      alert(`Thank you for your donation of $${donationAmount}!`);
      setDonateModalOpen(false);
      setDonationAmount('');
      setDonationMessage('');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: project?.title || 'ImpactHub Project',
      text: project?.mission || 'Support this impactful project',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Project link copied to clipboard!');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

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
          <p className="text-black">Loading project...</p>
        </div>
      </ProtectedRoute>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/projects" 
              className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
            >
              ← Back to Projects
            </Link>
            <h1 className="text-4xl font-extrabold text-black mb-2">{project.title}</h1>
            <p className="text-xl text-gray-700">{project.mission}</p>
          </div>

          {/* Project Management Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'tasks', label: 'Tasks', icon: '✅' },
                  { id: 'timeline', label: 'Timeline', icon: '📅' },
                  { id: 'reports', label: 'Reports', icon: '📋' },
                ].map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'tasks' | 'timeline' | 'reports')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 scale-105'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="flex items-center space-x-2">
                      <span className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : ''}`}>
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                      {activeTab === tab.id && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                      )}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg hover-lift group cursor-pointer">
                    <div className="flex items-center">
                      <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">💰</div>
                      <div>
                        <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Total Raised</p>
                        <p className="text-2xl font-bold text-black group-hover:text-blue-600 transition-colors duration-300">${project.raised.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg hover-lift group cursor-pointer">
                    <div className="flex items-center">
                      <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
                      <div>
                        <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Goal</p>
                        <p className="text-2xl font-bold text-black group-hover:text-green-600 transition-colors duration-300">${project.goal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg hover-lift group cursor-pointer">
                    <div className="flex items-center">
                      <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">📈</div>
                      <div>
                        <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Progress</p>
                        <p className="text-2xl font-bold text-black group-hover:text-purple-600 transition-colors duration-300">{Math.round((project.raised / project.goal) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">Funding Progress</h3>
                  <div className="bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${Math.round((project.raised / project.goal) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${project.raised.toLocaleString()}</span>
                    <span>${project.goal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setDonateModalOpen(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg micro-bounce ripple group"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Donate Now</span>
                      <span className="group-hover:scale-110 transition-transform duration-300">💝</span>
                    </span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md micro-bounce ripple group"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Share Project</span>
                      <span className="group-hover:scale-110 transition-transform duration-300">📤</span>
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-black">Project Tasks</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                    Create Task
                  </button>
                </div>

                {project.tasks && project.tasks.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {project.tasks.map((task) => (
                      <div key={task.id} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-black">{task.title}</h3>
                          <div className="flex space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{task.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-black">{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="text-gray-600">Start:</span>
                            <span className="ml-1 font-medium text-black">
                              {task.startDate ? new Date(task.startDate).toLocaleDateString() : 'TBD'}
                            </span>
                            <span className="text-gray-600 ml-4">End:</span>
                            <span className="ml-1 font-medium text-black">
                              {task.endDate ? new Date(task.endDate).toLocaleDateString() : 'TBD'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-black mb-2">No Tasks Yet</h3>
                    <p className="text-gray-600 mb-4">Create your first project task to get started</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                      Create Task
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-black">Project Timeline</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                    Add Timeline Event
                  </button>
                </div>

                {project.timeline && project.timeline.length > 0 ? (
                  <div className="space-y-4">
                    {project.timeline.map((event) => (
                      <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-4 h-4 rounded-full ${event.milestone ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-black">{event.title}</h4>
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
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-xl font-semibold text-black mb-2">No Timeline Events Yet</h3>
                    <p className="text-gray-600 mb-4">Add timeline events to track project milestones</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                      Add Timeline Event
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-black">Project Reports</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                    Create Report
                  </button>
                </div>

                {project.reports && project.reports.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {project.reports.map((report) => (
                      <div key={report.id} className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-black">{report.title}</h3>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                            {report.reportType}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{report.content}</p>
                        <div className="text-sm text-gray-600">
                          Created: {new Date(report.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-semibold text-black mb-2">No Reports Yet</h3>
                    <p className="text-gray-600 mb-4">Create your first project report to document progress</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                      Create Report
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Donation Modal */}
        {donateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-black mb-4">Donate to {project.title}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Amount ($)</label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Message (Optional)</label>
                  <textarea
                    value={donationMessage}
                    onChange={(e) => setDonationMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Add a message..."
                    rows={3}
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDonate}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Donate
                  </button>
                  <button
                    onClick={() => setDonateModalOpen(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}