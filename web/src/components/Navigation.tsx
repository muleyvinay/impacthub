'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  ProjectsIcon, 
  SpacesIcon, 
  ImpactIcon, 
  LearnIcon, 
  CommunityIcon, 
  AchievementsIcon, 
  ChallengesIcon, 
  TrendingIcon, 
  AccountIcon,
  WalletIcon,
  SettingsIcon,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
  ArrowDownIcon
} from './icons';

export default function Navigation() {
  const { user, isAuthenticated, logout, connectWallet } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleConnectWallet = async () => {
    await connectWallet();
  };

  const navigationItems = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/projects', label: 'Projects', icon: ProjectsIcon },
    { href: '/spaces', label: 'Spaces', icon: SpacesIcon },
  ];

  const authenticatedItems = [
    { href: '/impact', label: 'Impact', icon: ImpactIcon },
    { href: '/learn', label: 'Learn', icon: LearnIcon },
    { href: '/community', label: 'Community', icon: CommunityIcon },
    { href: '/achievements', label: 'Achievements', icon: AchievementsIcon },
    { href: '/challenges', label: 'Challenges', icon: ChallengesIcon },
    { href: '/trending', label: 'Trending', icon: TrendingIcon },
    { href: '/account', label: 'Account', icon: AccountIcon },
  ];

  return (
    <nav className={`nav-premium fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">IH</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              ImpactHub
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift relative group text-gray-700 hover:text-blue-600"
                >
                  <IconComponent size="sm" className="icon-bounce" />
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                </Link>
              );
            })}
            
            {isAuthenticated && authenticatedItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift relative group text-gray-700 hover:text-blue-600"
                >
                  <IconComponent size="sm" className="icon-bounce" />
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Connect Wallet Button */}
                {!user?.walletAddress && (
                  <button
                    onClick={handleConnectWallet}
                    className="btn-accent flex items-center space-x-2 ripple-effect"
                  >
                    <WalletIcon size="sm" />
                    <span>Connect Wallet</span>
                  </button>
                )}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift group text-gray-700 hover:text-blue-600"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="hidden md:block font-medium">{user?.name}</span>
                    <ArrowDownIcon 
                      size="sm" 
                      className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-2 animate-pulse-slow">
                          {user?.role?.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <Link 
                        href="/account" 
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200 ease-in-out transform hover:translate-x-1 hover:scale-105"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <SettingsIcon size="sm" className="text-blue-500" />
                        <span>Profile Settings</span>
                      </Link>
                      
                      {user?.role === 'admin' && (
                        <Link 
                          href="/admin" 
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-all duration-200 ease-in-out transform hover:translate-x-1 hover:scale-105"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <span className="text-purple-500">👑</span>
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 ease-in-out transform hover:translate-x-1 hover:scale-105"
                      >
                        <LogoutIcon size="sm" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/auth" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 ease-in-out transform hover:scale-105 relative group px-4 py-2 rounded-lg"
                >
                  <span className="relative z-10">Sign In</span>
                  <span className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                </Link>
                <Link 
                  href="/auth" 
                  className="btn-primary flex items-center space-x-2 ripple-effect"
                >
                  <span>Get Started</span>
                  <span className="group-hover:scale-110 transition-transform duration-300">🚀</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            >
              {isMobileMenuOpen ? <CloseIcon size="md" /> : <MenuIcon size="md" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 animate-fade-in">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent size="sm" className="icon-bounce" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {isAuthenticated && authenticatedItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent size="sm" className="icon-bounce" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}