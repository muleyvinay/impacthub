'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'donor' | 'project_lead' | 'admin' | 'community';
  walletAddress?: string;
  avatar?: string;
  isOnboarded: boolean;
  totalDonated: number;
  projectsSupported: number;
  nftBadges: number;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  connectWallet: () => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call - in production, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in production, this would come from your API
      const mockUser: User = {
        id: 'user_123',
        name: 'John Doe',
        email: email,
        role: 'donor',
        walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        isOnboarded: true,
        totalDonated: 1240,
        projectsSupported: 3,
        nftBadges: 3,
        joinDate: '2024-01-15'
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock new user data
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: name,
        email: email,
        role: role as User['role'],
        isOnboarded: false,
        totalDonated: 0,
        projectsSupported: 0,
        nftBadges: 0,
        joinDate: new Date().toISOString().split('T')[0]
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const connectWallet = async (): Promise<boolean> => {
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = {
          ...user,
          walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return true;
    } catch (error) {
      console.error('Wallet connection error:', error);
      return false;
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, isOnboarded: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    connectWallet,
    updateUser,
    completeOnboarding
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
