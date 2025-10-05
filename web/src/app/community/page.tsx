'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  impact: number;
  badges: string[];
  isOnline: boolean;
  lastActive: string;
  bio: string;
  interests: string[];
  achievements: number;
}

interface CommunityPost {
  id: string;
  author: CommunityMember;
  content: string;
  type: 'story' | 'update' | 'question' | 'celebration';
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  tags: string[];
  isLiked: boolean;
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'webinar' | 'workshop' | 'meetup' | 'challenge';
  attendees: number;
  maxAttendees: number;
  isRegistered: boolean;
  host: string;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'events' | 'discussions'>('feed');

  const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'Climate Activist',
      impact: 89,
      badges: ['🌱', '💧', '📚'],
      isOnline: true,
      lastActive: '2 minutes ago',
      bio: 'Passionate about environmental conservation and sustainable living',
      interests: ['Climate Change', 'Renewable Energy', 'Conservation'],
      achievements: 15
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'MC',
      role: 'Education Advocate',
      impact: 76,
      badges: ['📚', '👥', '🎯'],
      isOnline: false,
      lastActive: '1 hour ago',
      bio: 'Working to improve education access in underserved communities',
      interests: ['Education', 'Digital Literacy', 'Youth Development'],
      achievements: 12
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      avatar: 'ER',
      role: 'Healthcare Professional',
      impact: 94,
      badges: ['🏥', '💊', '🌍'],
      isOnline: true,
      lastActive: '5 minutes ago',
      bio: 'Dedicated to improving healthcare access and mental health awareness',
      interests: ['Healthcare', 'Mental Health', 'Public Health'],
      achievements: 18
    }
  ]);

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      author: communityMembers[0],
      content: 'Just completed our mangrove restoration project in Indonesia! We planted over 10,000 trees and created jobs for 50 local community members. The impact is already visible with improved water quality and increased fish populations. 🌱🌊',
      type: 'celebration',
      likes: 24,
      comments: 8,
      shares: 5,
      createdAt: '2 hours ago',
      tags: ['Climate Action', 'Conservation', 'Community Impact'],
      isLiked: true
    },
    {
      id: '2',
      author: communityMembers[1],
      content: 'Looking for volunteers to help with our digital literacy program for seniors. We need people who can teach basic computer skills and internet safety. Any takers? 👥💻',
      type: 'question',
      likes: 12,
      comments: 15,
      shares: 3,
      createdAt: '4 hours ago',
      tags: ['Education', 'Digital Literacy', 'Volunteering'],
      isLiked: false
    },
    {
      id: '3',
      author: communityMembers[2],
      content: 'Our mental health support network has reached 1,000 people this month! We\'ve provided counseling services, peer support groups, and crisis intervention. Thank you to all the volunteers and donors who made this possible. 🏥💚',
      type: 'update',
      likes: 31,
      comments: 12,
      shares: 8,
      createdAt: '6 hours ago',
      tags: ['Mental Health', 'Healthcare', 'Community Support'],
      isLiked: true
    }
  ]);

  const [communityEvents, setCommunityEvents] = useState<CommunityEvent[]>([
    {
      id: '1',
      title: 'Climate Action Workshop',
      description: 'Learn about effective climate action strategies and how to implement them in your community',
      date: '2025-01-15',
      time: '2:00 PM EST',
      type: 'workshop',
      attendees: 45,
      maxAttendees: 100,
      isRegistered: false,
      host: 'Sarah Johnson'
    },
    {
      id: '2',
      title: 'Global Impact Summit',
      description: 'Join us for a day of inspiring talks, networking, and collaborative problem-solving',
      date: '2025-01-20',
      time: '9:00 AM EST',
      type: 'webinar',
      attendees: 234,
      maxAttendees: 500,
      isRegistered: true,
      host: 'ImpactHub Team'
    },
    {
      id: '3',
      title: '30-Day Impact Challenge',
      description: 'Take on daily challenges to reduce your environmental footprint and help others',
      date: '2025-01-25',
      time: 'All Day',
      type: 'challenge',
      attendees: 156,
      maxAttendees: 1000,
      isRegistered: false,
      host: 'Community Leaders'
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLikePost = (postId: string) => {
    setCommunityPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1 
            }
          : post
      )
    );
  };

  const handleRegisterEvent = (eventId: string) => {
    setCommunityEvents(events =>
      events.map(event =>
        event.id === eventId
          ? { ...event, isRegistered: !event.isRegistered }
          : event
      )
    );
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'webinar': return 'text-blue-600 bg-blue-100';
      case 'workshop': return 'text-green-600 bg-green-100';
      case 'meetup': return 'text-purple-600 bg-purple-100';
      case 'challenge': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'story': return '📖';
      case 'update': return '📢';
      case 'question': return '❓';
      case 'celebration': return '🎉';
      default: return '📝';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Community Hub</h1>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              Connect with like-minded individuals, share your impact stories, and learn from others 
              who are making a difference in the world.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
              <div className="flex gap-2">
                {[
                  { id: 'feed', label: 'Community Feed', icon: '📱' },
                  { id: 'members', label: 'Members', icon: '👥' },
                  { id: 'events', label: 'Events', icon: '📅' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'feed' | 'members' | 'events' | 'discussions')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-black/70 hover:bg-blue-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Community Feed */}
          {activeTab === 'feed' && (
            <div className="max-w-4xl mx-auto">
              {/* Create Post */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your impact story, ask a question, or celebrate a milestone..."
                      className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none"
                      rows={3}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-4">
                        <button className="text-gray-500 hover:text-blue-600">📷 Photo</button>
                        <button className="text-gray-500 hover:text-blue-600">🎥 Video</button>
                        <button className="text-gray-500 hover:text-blue-600">📊 Poll</button>
                      </div>
                      <button 
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        disabled={!newPost.trim()}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <div key={post.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {post.author.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-black">{post.author.name}</h3>
                          <span className="text-black/60">{post.author.role}</span>
                          <span className="text-black/40">•</span>
                          <span className="text-black/60">{post.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{getPostTypeIcon(post.type)}</span>
                          <span className="text-sm text-black/60 capitalize">{post.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-black mb-4">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-2 ${
                          post.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                        }`}
                      >
                        <span>{post.isLiked ? '❤️' : '🤍'}</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
                        <span>💬</span>
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-green-600">
                        <span>🔄</span>
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Members */}
          {activeTab === 'members' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityMembers.map((member) => (
                <div key={member.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {member.avatar}
                      </div>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-black">{member.name}</h3>
                      <p className="text-black/60">{member.role}</p>
                      <p className="text-sm text-black/50">{member.lastActive}</p>
                    </div>
                  </div>
                  
                  <p className="text-black/70 mb-4">{member.bio}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-black/60">Impact Score</span>
                      <span className="font-bold text-black">{member.impact}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">Achievements</span>
                      <span className="font-bold text-black">{member.achievements}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-bold text-black mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.interests.map((interest, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-bold text-black mb-2">Badges</h4>
                    <div className="flex gap-2">
                      {member.badges.map((badge, index) => (
                        <span key={index} className="text-2xl">{badge}</span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Events */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {communityEvents.map((event) => (
                <div key={event.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-black">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  
                  <p className="text-black/70 mb-4">{event.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-black/60">Date & Time</span>
                      <span className="text-black">{event.date} at {event.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">Host</span>
                      <span className="text-black">{event.host}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">Attendees</span>
                      <span className="text-black">{event.attendees}/{event.maxAttendees}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleRegisterEvent(event.id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      event.isRegistered 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {event.isRegistered ? 'Registered ✓' : 'Register Now'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Join the Global Impact Community</h2>
            <p className="text-xl mb-6 opacity-90">
              Connect with changemakers, share your impact, and learn from others making a difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start Connecting
              </button>
              <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
