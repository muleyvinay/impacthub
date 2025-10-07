'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShareIcon, HeartIcon, EyeIcon, DonateIcon } from './icons';

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

interface EnhancedProjectCardProps {
  project: Project;
  index: number;
  viewMode: 'grid' | 'management';
  onLike?: (projectId: string) => void;
  onShare?: (projectId: string) => void;
  onDonate?: (projectId: string) => void;
}

export default function EnhancedProjectCard({ 
  project, 
  index, 
  viewMode, 
  onLike, 
  onShare, 
  onDonate 
}: EnhancedProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const progress = (project.raised / project.goal) * 100;
  const daysLeft = Math.ceil((new Date(project.updatedAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health': return 'bg-blue-100 text-blue-800';
      case 'Education': return 'bg-green-100 text-green-800';
      case 'Climate': return 'bg-orange-100 text-orange-800';
      case 'Environment': return 'bg-emerald-100 text-emerald-800';
      case 'Social Impact': return 'bg-purple-100 text-purple-800';
      case 'Technology': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(project.id);
  };

  const handleShare = () => {
    onShare?.(project.id);
    // Add share functionality here
  };

  const handleDonate = () => {
    onDonate?.(project.id);
    // Add donate functionality here
  };

  if (viewMode === 'management') {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-black mb-2">{project.title}</h3>
            <p className="text-gray-700 text-lg">{project.mission}</p>
          </div>
          <div className="flex space-x-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(project.category)}`}>
              {project.category}
            </span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
            <div className="text-sm text-blue-600 font-semibold mb-2">Funding Progress</div>
            <div className="text-2xl font-bold text-blue-800 mb-1">${project.raised.toLocaleString()}</div>
            <div className="text-sm text-blue-600">of ${project.goal.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
            <div className="text-sm text-green-600 font-semibold mb-2">Tasks</div>
            <div className="text-2xl font-bold text-green-800 mb-1">{project.tasks?.length || 0}</div>
            <div className="text-sm text-green-600">Total Tasks</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
            <div className="text-sm text-purple-600 font-semibold mb-2">Active Tasks</div>
            <div className="text-2xl font-bold text-purple-800 mb-1">
              {project.tasks?.filter(task => task.status === 'IN_PROGRESS').length || 0}
            </div>
            <div className="text-sm text-purple-600">In Progress</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
            <div className="text-sm text-orange-600 font-semibold mb-2">Milestones</div>
            <div className="text-2xl font-bold text-orange-800 mb-1">
              {project.timeline?.filter(event => event.milestone).length || 0}
            </div>
            <div className="text-sm text-orange-600">Key Milestones</div>
          </div>
        </div>

        {/* Tasks */}
        {project.tasks && project.tasks.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xl font-bold text-black mb-6">Active Tasks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.tasks.map((task) => (
                <div key={task.id} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-black text-lg">{task.title}</h5>
                    <div className="flex space-x-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Assignee: {task.assignee} | Due: {task.dueDate}
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-black">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {project.timeline && project.timeline.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xl font-bold text-black mb-6">Project Timeline</h4>
            <div className="space-y-4">
              {project.timeline.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
                  <div className={`w-4 h-4 rounded-full ${event.milestone ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-black">{event.title}</h5>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
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
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View Full Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer masked-reveal-left"
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Cover */}
      <div className="relative h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden group-hover:from-blue-500 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center transform group-hover:scale-110 transition-all duration-500">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500">
              <span className="text-5xl animate-float">🌱</span>
            </div>
            <p className="text-white/90 font-medium text-lg">Project Impact</p>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 transform group-hover:scale-105 transition-transform duration-300">
          <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>
        </div>
        
        {/* Progress Badge */}
        <div className="absolute top-4 right-4 transform group-hover:scale-105 transition-transform duration-300">
          <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
            {Math.round(progress)}% Complete
          </span>
        </div>
        
        {/* Days Left Badge */}
        <div className="absolute bottom-4 right-4 transform group-hover:scale-105 transition-transform duration-300">
          <span className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
            {daysLeft > 0 ? `${daysLeft} days left` : 'Ongoing'}
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
        
        {/* Progress Bar */}
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

        {/* Quick Stats */}
        {project.tasks && project.tasks.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
            <h4 className="text-sm font-semibold text-black mb-3">Project Management</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">{project.tasks.length}</div>
                <div className="text-xs text-gray-600">Tasks</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {project.tasks.filter(task => task.status === 'COMPLETED').length}
                </div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">
                  {project.timeline?.length || 0}
                </div>
                <div className="text-xs text-gray-600">Milestones</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
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
          
          <button 
            onClick={handleDonate}
            className="bg-green-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 group"
          >
            <DonateIcon size="sm" className="group-hover:scale-110 transition-transform duration-300" />
          </button>
          
          <button 
            onClick={handleLike}
            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 group ${
              isLiked 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <HeartIcon size="sm" className={`group-hover:scale-110 transition-transform duration-300 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button 
            onClick={handleShare}
            className="bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 group"
          >
            <ShareIcon size="sm" className="group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
