'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOnboarding?: boolean;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireOnboarding = true,
  allowedRoles = []
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Check authentication
    if (requireAuth && !isAuthenticated) {
      router.push('/auth');
      return;
    }

    // Check onboarding
    if (requireAuth && requireOnboarding && user && !user.isOnboarded) {
      router.push('/onboarding');
      return;
    }

    // Check role-based access
    if (requireAuth && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      router.push('/');
      return;
    }
  }, [user, isAuthenticated, isLoading, requireAuth, requireOnboarding, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-black">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (requireAuth && requireOnboarding && user && !user.isOnboarded) {
    return null;
  }

  if (requireAuth && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
