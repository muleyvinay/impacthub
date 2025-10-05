'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

interface UserProfile {
  name: string;
  email: string;
  role: 'donor' | 'project_lead' | 'admin' | 'community';
  walletAddress?: string;
  totalDonated: number;
  projectsSupported: number;
  nftBadges: number;
  joinDate: string;
  reputationScore: number;
  reputationLevel: string;
  verificationLevel: string;
  benefits: string[];
}

interface Donation {
  id: string;
  projectTitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'donor',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    totalDonated: 1240,
    projectsSupported: 3,
    nftBadges: 3,
    joinDate: '2024-01-15',
    reputationScore: 75,
    reputationLevel: 'ADVANCED',
    verificationLevel: 'VERIFIED',
    benefits: ['Can vote on proposals', 'Can create proposals', 'Higher voting weight']
  });

  const [donations] = useState<Donation[]>([
    {
      id: '1',
      projectTitle: 'Clean Water Initiative',
      amount: 500,
      date: '2025-01-03',
      status: 'completed'
    },
    {
      id: '2',
      projectTitle: 'After-school Learning',
      amount: 300,
      date: '2025-01-01',
      status: 'completed'
    },
    {
      id: '3',
      projectTitle: 'Mangrove Restoration',
      amount: 440,
      date: '2024-12-28',
      status: 'completed'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email
  });

  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email
    }));
    setIsEditing(false);
  };

  const handleRoleChange = (newRole: string) => {
    setProfile(prev => ({
      ...prev,
      role: newRole as UserProfile['role']
    }));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'project_lead': return 'bg-blue-100 text-blue-800';
      case 'donor': return 'bg-green-100 text-green-800';
      case 'community': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">My Account</h1>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Manage your profile, view your impact, and track your contributions to the community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-black">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {profile.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{profile.name}</h3>
                      <p className="text-black">{profile.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Role</label>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(profile.role)}`}>
                        {profile.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Member Since</label>
                      <p className="text-black">{new Date(profile.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Wallet Address</label>
                      <p className="text-black font-mono text-sm">{profile.walletAddress}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-6">Switch Role</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'donor', label: 'Donor', icon: '💝' },
                  { value: 'project_lead', label: 'Project Lead', icon: '👨‍💼' },
                  { value: 'admin', label: 'Admin', icon: '⚙️' },
                  { value: 'community', label: 'Community', icon: '👥' }
                ].map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleRoleChange(role.value)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      profile.role === role.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{role.icon}</div>
                    <div className="font-medium text-sm">{role.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Donation History */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-6">Donation History</h2>
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-black">{donation.projectTitle}</h3>
                      <p className="text-sm text-black">{donation.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${donation.amount}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donation.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Impact Stats */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-xl font-bold text-black mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">${profile.totalDonated.toLocaleString()}</p>
                  <p className="text-sm text-black">Total Donated</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{profile.projectsSupported}</p>
                  <p className="text-sm text-black">Projects Supported</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{profile.nftBadges}</p>
                  <p className="text-sm text-black">NFT Badges</p>
                </div>
              </div>
            </div>

            {/* Reputation Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-xl font-bold text-black mb-4">Reputation & Verification</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black">Reputation Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${profile.reputationScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-black">{profile.reputationScore}/100</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black">Level</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {profile.reputationLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-black">Verification</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {profile.verificationLevel}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-black mb-2">Benefits:</p>
                  <ul className="space-y-1">
                    {profile.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-black flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-xl font-bold text-black mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  Connect Wallet
                </button>
                <button className="w-full bg-white/50 text-black px-4 py-3 rounded-lg font-medium hover:bg-white/70 transition-all duration-200 border border-gray-200">
                  View All Projects
                </button>
                <button className="w-full bg-white/50 text-black px-4 py-3 rounded-lg font-medium hover:bg-white/70 transition-all duration-200 border border-gray-200">
                  Create Proposal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white/70 backdrop-blur-sm text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-200 border border-white/20 shadow-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
