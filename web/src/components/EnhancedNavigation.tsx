'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/contexts/WalletContext';
import WalletConnect from '@/components/WalletConnect';
import WalletSelectionModal from '@/components/WalletSelectionModal';
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
  ArrowDownIcon,
  BellIcon,
  SearchIcon
} from './icons';

export default function EnhancedNavigation() {
  const { user, isAuthenticated, logout, connectWallet } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <span className="text-white font-bold text-xl">IH</span>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-900 transition-all duration-300">
                ImpactHub
              </span>
              <div className="text-xs text-gray-500 font-medium">Web3 Impact Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="group flex items-center space-x-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift relative text-gray-700 hover:text-blue-600"
                >
                  <IconComponent size="md" className="icon-bounce group-hover:scale-110" />
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-blue-50 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                </Link>
              );
            })}
            
            {isAuthenticated && authenticatedItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="group flex items-center space-x-3 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift relative text-gray-700 hover:text-blue-600"
                >
                  <IconComponent size="md" className="icon-bounce group-hover:scale-110" />
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-blue-50 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Search Button */}
                <button className="p-3 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                  <SearchIcon size="md" />
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-3 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 relative"
                  >
                    <BellIcon size="md" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 py-4 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h4 className="font-semibold text-gray-900">Notifications</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                          <div className="text-sm font-medium text-gray-900">New project funded!</div>
                          <div className="text-xs text-gray-500">2 minutes ago</div>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200">
                          <div className="text-sm font-medium text-gray-900">Achievement unlocked!</div>
                          <div className="text-xs text-gray-500">1 hour ago</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Connect Wallet Button */}
                {!user?.walletAddress && (
                  <button
                    onClick={handleConnectWallet}
                    className="btn-accent flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold ripple-effect transform hover:scale-105 transition-all duration-300"
                  >
                    <WalletIcon size="md" />
                    <span>Connect Wallet</span>
                  </button>
                )}

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-4 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift group text-gray-700 hover:text-blue-600"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="font-semibold text-gray-900">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.role?.replace('_', ' ').toUpperCase()}</div>
                    </div>
                    <ArrowDownIcon 
                      size="md" 
                      className={`transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 py-4 z-50 animate-fade-in">
                      <div className="px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              {user?.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-sm text-gray-500">{user?.email}</p>
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-2 animate-pulse-slow">
                              {user?.role?.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link 
                          href="/account" 
                          className="flex items-center space-x-4 px-6 py-4 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200 ease-in-out transform hover:translate-x-2 hover:scale-105"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <SettingsIcon size="md" className="text-blue-500" />
                          <span>Profile Settings</span>
                        </Link>
                        
                        {user?.role === 'admin' && (
                          <Link 
                            href="/admin" 
                            className="flex items-center space-x-4 px-6 py-4 text-sm text-gray-700 hover:bg-purple-50 transition-all duration-200 ease-in-out transform hover:translate-x-2 hover:scale-105"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <span className="text-purple-500 text-xl">👑</span>
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-4 w-full px-6 py-4 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 ease-in-out transform hover:translate-x-2 hover:scale-105"
                        >
                          <LogoutIcon size="md" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/auth" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 ease-in-out transform hover:scale-105 relative group px-6 py-3 rounded-2xl"
                >
                  <span className="relative z-10">Sign In</span>
                  <span className="absolute inset-0 bg-blue-50 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                </Link>
                <Link 
                  href="/auth" 
                  className="btn-primary flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold ripple-effect transform hover:scale-105 transition-all duration-300"
                >
                  <span>Get Started</span>
                  <span className="group-hover:scale-110 transition-transform duration-300">🚀</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              {isMobileMenuOpen ? <CloseIcon size="lg" /> : <MenuIcon size="lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-6 animate-fade-in">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-4 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent size="md" className="icon-bounce" />
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
                    className="flex items-center space-x-4 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover-lift text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent size="md" className="icon-bounce" />
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
