'use client';

import { useState, useEffect } from 'react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

interface RealTimeStatsProps {
  className?: string;
}

export default function RealTimeStats({ className = '' }: RealTimeStatsProps) {
  const [stats, setStats] = useState<StatItem[]>([
    {
      id: 'total-raised',
      label: 'Total Raised',
      value: 2400000,
      unit: '$',
      change: 12.5,
      changeType: 'positive',
      icon: '💰',
      color: 'blue'
    },
    {
      id: 'active-projects',
      label: 'Active Projects',
      value: 1247,
      unit: '',
      change: 8.2,
      changeType: 'positive',
      icon: '📊',
      color: 'green'
    },
    {
      id: 'community-members',
      label: 'Community Members',
      value: 15200,
      unit: '',
      change: 23.1,
      changeType: 'positive',
      icon: '👥',
      color: 'purple'
    },
    {
      id: 'success-rate',
      label: 'Success Rate',
      value: 89,
      unit: '%',
      change: 3.2,
      changeType: 'positive',
      icon: '🎯',
      color: 'orange'
    },
    {
      id: 'countries',
      label: 'Countries',
      value: 45,
      unit: '',
      change: 2,
      changeType: 'positive',
      icon: '🌍',
      color: 'indigo'
    },
    {
      id: 'impact-score',
      label: 'Impact Score',
      value: 94,
      unit: '/100',
      change: 1.8,
      changeType: 'positive',
      icon: '⭐',
      color: 'yellow'
    }
  ]);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Update stats with small random changes
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.value + Math.floor(Math.random() * 10 - 5),
          change: Math.max(0, stat.change + (Math.random() * 2 - 1))
        }))
      );
      
      setTimeout(() => setIsAnimating(false), 1000);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 text-blue-600',
      green: 'from-green-500 to-green-600 text-green-600',
      purple: 'from-purple-500 to-purple-600 text-purple-600',
      orange: 'from-orange-500 to-orange-600 text-orange-600',
      indigo: 'from-indigo-500 to-indigo-600 text-indigo-600',
      yellow: 'from-yellow-500 to-yellow-600 text-yellow-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'from-gray-500 to-gray-600 text-gray-600';
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(1)}K`;
      }
      return `$${value.toLocaleString()}`;
    }
    return `${value.toLocaleString()}${unit}`;
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-black mb-4">Live Impact Dashboard</h3>
        <p className="text-gray-600 text-lg">Real-time statistics from our global community</p>
        <div className="inline-flex items-center mt-4 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live Updates
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={stat.id}
            className="group text-center hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(stat.color).split(' ')[0]} ${getColorClasses(stat.color).split(' ')[1]} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl group-hover:animate-wiggle">{stat.icon}</span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className={`text-4xl font-bold ${getColorClasses(stat.color).split(' ')[2]} mb-2 group-hover:animate-pulse transition-all duration-300`}>
                  {isAnimating ? (
                    <span className="animate-pulse">{formatValue(stat.value, stat.unit)}</span>
                  ) : (
                    formatValue(stat.value, stat.unit)
                  )}
                </div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <span className={`text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.changeType === 'positive' ? '+' : stat.changeType === 'negative' ? '-' : ''}{stat.change.toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500">this month</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
          <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
          <div className="text-sm text-blue-700 font-semibold">Monitoring</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
          <div className="text-2xl font-bold text-green-600 mb-2">99.9%</div>
          <div className="text-sm text-green-700 font-semibold">Uptime</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl">
          <div className="text-2xl font-bold text-purple-600 mb-2">Real-time</div>
          <div className="text-sm text-purple-700 font-semibold">Updates</div>
        </div>
      </div>
    </div>
  );
}
