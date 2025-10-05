'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

interface Proposal {
  id: string;
  title: string;
  description: string;
  category: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'ACTIVE' | 'PASSED' | 'REJECTED' | 'EXPIRED';
  author: string;
  createdAt: string;
  userVote?: 'FOR' | 'AGAINST';
}

interface VoteRequest {
  userId: string;
  proposalId: string;
  voteType: 'FOR' | 'AGAINST';
}

export default function SpacesPage() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'Community Garden Initiative',
      description: 'Create a community garden in the downtown area to promote sustainable living and food security.',
      category: 'Environment',
      votesFor: 35,
      votesAgainst: 10,
      totalVotes: 45,
      status: 'ACTIVE',
      author: 'Sarah Johnson',
      createdAt: '2025-01-03'
    },
    {
      id: '2',
      title: 'Digital Literacy Program',
      description: 'Provide free computer and internet training for seniors and underserved communities.',
      category: 'Education',
      votesFor: 25,
      votesAgainst: 7,
      totalVotes: 32,
      status: 'ACTIVE',
      author: 'Mike Chen',
      createdAt: '2025-01-02'
    },
    {
      id: '3',
      title: 'Mental Health Support Network',
      description: 'Establish peer support groups and counseling services for mental health awareness.',
      category: 'Health',
      votesFor: 50,
      votesAgainst: 17,
      totalVotes: 67,
      status: 'PASSED',
      author: 'Dr. Emily Rodriguez',
      createdAt: '2025-01-01'
    }
  ]);

  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'Environment'
  });

  const [showProposalForm, setShowProposalForm] = useState(false);
  const [voting, setVoting] = useState<{ [key: string]: boolean }>({});
  const [comments, setComments] = useState<{ [key: string]: string[] }>({
    '1': ['Great initiative! This will help our community.', 'I support this proposal.'],
    '2': ['Excellent idea for digital literacy.', 'This is much needed in our area.'],
    '3': ['Mental health support is crucial.', 'This initiative will save lives.']
  });
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});

  const handleVote = async (proposalId: string, voteType: 'FOR' | 'AGAINST') => {
    if (!user) {
      alert('Please log in to vote');
      return;
    }

    setVoting(prev => ({ ...prev, [proposalId]: true }));

    try {
      const voteRequest: VoteRequest = {
        userId: user.id,
        proposalId,
        voteType,
      };

      const response = await fetch('http://localhost:3001/voting/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteRequest),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state
        setProposals(prev => prev.map(proposal => {
          if (proposal.id === proposalId) {
            const newVotesFor = voteType === 'FOR' ? proposal.votesFor + 1 : proposal.votesFor;
            const newVotesAgainst = voteType === 'AGAINST' ? proposal.votesAgainst + 1 : proposal.votesAgainst;
            return {
              ...proposal,
              votesFor: newVotesFor,
              votesAgainst: newVotesAgainst,
              totalVotes: newVotesFor + newVotesAgainst,
              userVote: voteType,
            };
          }
          return proposal;
        }));
      } else {
        alert(result.message || 'Failed to vote');
      }
    } catch (error) {
      console.error('Voting error:', error);
      alert('Failed to vote. Please try again.');
    } finally {
      setVoting(prev => ({ ...prev, [proposalId]: false }));
    }
  };

  const handleAddComment = (proposalId: string) => {
    const comment = newComments[proposalId];
    if (comment && comment.trim()) {
      setComments(prev => ({
        ...prev,
        [proposalId]: [...(prev[proposalId] || []), comment.trim()]
      }));
      setNewComments(prev => ({
        ...prev,
        [proposalId]: ''
      }));
    }
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProposal.title && newProposal.description) {
      const proposal: Proposal = {
        id: Date.now().toString(),
        title: newProposal.title,
        description: newProposal.description,
        category: newProposal.category,
        votesFor: 0,
        votesAgainst: 0,
        totalVotes: 0,
        status: 'ACTIVE',
        author: 'You',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProposals(prev => [proposal, ...prev]);
      setNewProposal({ title: '', description: '', category: 'Environment' });
      setShowProposalForm(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Environment': return 'bg-green-100 text-green-800';
      case 'Education': return 'bg-blue-100 text-blue-800';
      case 'Health': return 'bg-red-100 text-red-800';
      case 'Community': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-yellow-100 text-yellow-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Community Spaces</h1>
          <p className="text-xl text-black max-w-2xl mx-auto">
            Join the conversation and propose new initiatives. Vote on community proposals and help shape the future.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-2xl font-bold text-black">Active Proposals</h3>
            <p className="text-3xl font-bold text-blue-600">
              {proposals.filter(p => p.status === 'ACTIVE').length}
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-2xl font-bold text-black">Total Votes</h3>
            <p className="text-3xl font-bold text-green-600">
              {proposals.reduce((sum, p) => sum + p.totalVotes, 0)}
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-2xl font-bold text-black">Passed Initiatives</h3>
            <p className="text-3xl font-bold text-purple-600">
              {proposals.filter(p => p.status === 'PASSED').length}
            </p>
          </div>
        </div>

        {/* Propose New Initiative Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowProposalForm(!showProposalForm)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            {showProposalForm ? 'Cancel' : 'Propose New Initiative'}
          </button>
        </div>

        {/* Proposal Form */}
        {showProposalForm && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">Propose New Initiative</h2>
            <form onSubmit={handleSubmitProposal} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Title</label>
                <input
                  type="text"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Enter initiative title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Description</label>
                <textarea
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 text-black"
                  placeholder="Describe your initiative in detail"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Category</label>
                <select
                  value={newProposal.category}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  <option value="Environment">Environment</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Community">Community</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Submit Proposal
                </button>
                <button
                  type="button"
                  onClick={() => setShowProposalForm(false)}
                  className="bg-gray-200 text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Proposals List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-black mb-6">Community Proposals</h2>
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-black">{proposal.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(proposal.category)}`}>
                      {proposal.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                  <p className="text-black mb-4">{proposal.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>By {proposal.author}</span>
                    <span>•</span>
                    <span>{proposal.createdAt}</span>
                    <span>•</span>
                    <span>{proposal.totalVotes} votes ({proposal.votesFor} for, {proposal.votesAgainst} against)</span>
                  </div>
                </div>
              </div>
              
              {proposal.status === 'ACTIVE' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleVote(proposal.id, 'FOR')}
                    disabled={voting[proposal.id] || proposal.status !== 'ACTIVE'}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      proposal.userVote === 'FOR' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700'
                    } ${voting[proposal.id] || proposal.status !== 'ACTIVE' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {voting[proposal.id] ? 'Voting...' : 'Vote Yes'}
                  </button>
                  <button
                    onClick={() => handleVote(proposal.id, 'AGAINST')}
                    disabled={voting[proposal.id] || proposal.status !== 'ACTIVE'}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      proposal.userVote === 'AGAINST' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                    } ${voting[proposal.id] || proposal.status !== 'ACTIVE' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {voting[proposal.id] ? 'Voting...' : 'Vote No'}
                  </button>
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold text-black mb-3">Comments ({comments[proposal.id]?.length || 0})</h4>
                
                {/* Existing Comments */}
                <div className="space-y-3 mb-4">
                  {(comments[proposal.id] || []).map((comment, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          U
                        </div>
                        <div className="flex-1">
                          <p className="text-black text-sm">{comment}</p>
                          <p className="text-xs text-gray-500 mt-1">Community Member</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment Form */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newComments[proposal.id] || ''}
                    onChange={(e) => setNewComments(prev => ({
                      ...prev,
                      [proposal.id]: e.target.value
                    }))}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                  <button
                    onClick={() => handleAddComment(proposal.id)}
                    disabled={!newComments[proposal.id]?.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
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
