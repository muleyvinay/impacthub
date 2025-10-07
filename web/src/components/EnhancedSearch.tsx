'use client';

import { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon, XIcon } from './icons';

interface SearchFilters {
  query: string;
  category: string;
  status: string;
  sortBy: string;
  minAmount: number;
  maxAmount: number;
}

interface EnhancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  categories: string[];
  totalResults: number;
}

export default function EnhancedSearch({ onFiltersChange, categories, totalResults }: EnhancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'All',
    status: 'All',
    sortBy: 'recent',
    minAmount: 0,
    maxAmount: 1000000
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleInputChange = (field: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: 'All',
      status: 'All',
      sortBy: 'recent',
      minAmount: 0,
      maxAmount: 1000000
    });
  };

  const hasActiveFilters = filters.query || filters.category !== 'All' || filters.status !== 'All' || 
                          filters.minAmount > 0 || filters.maxAmount < 1000000;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl mb-8">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon size="md" className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects, organizations, or causes..."
            value={filters.query}
            onChange={(e) => handleInputChange('query', e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-300 hover:border-gray-300"
          />
          {filters.query && (
            <button
              onClick={() => handleInputChange('query', '')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <XIcon size="md" />
            </button>
          )}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center space-x-2 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              showAdvanced 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FilterIcon size="md" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            )}
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-6 py-4 rounded-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>Advanced Search</span>
            <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleInputChange('category', category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              filters.category === category
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-600">
          <span className="font-semibold text-black">{totalResults.toLocaleString()}</span> projects found
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <XIcon size="sm" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>

      {/* Advanced Search Panel */}
      {isExpanded && (
        <div className="border-t border-gray-200 pt-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="funding">Funding</option>
                <option value="planning">Planning</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleInputChange('sortBy', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="funding">Most Funded</option>
                <option value="deadline">Deadline</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>

            {/* Min Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Amount</label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => handleInputChange('minAmount', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="0"
              />
            </div>

            {/* Max Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Amount</label>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => handleInputChange('maxAmount', parseInt(e.target.value) || 1000000)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="1,000,000"
              />
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="mt-6 p-6 bg-gray-50 rounded-2xl animate-fade-in">
              <h4 className="text-lg font-semibold text-black mb-4">Advanced Filters</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All Locations</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="africa">Africa</option>
                    <option value="south-america">South America</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Impact Type</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All Types</option>
                    <option value="environmental">Environmental</option>
                    <option value="social">Social</option>
                    <option value="economic">Economic</option>
                    <option value="educational">Educational</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Verification</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All Projects</option>
                    <option value="verified">Verified Only</option>
                    <option value="pending">Pending Verification</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
