'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { useRole } from '@/hooks/useRole';
import type { UserRole } from '@/types/roles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
  requireAuth?: boolean;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = '/login',
  requireAuth = true,
}: ProtectedRouteProps) {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const authLoading = useAppSelector((state) => state.auth.loading);
  const { roles, loading: roleLoading, hasAnyRole } = useRole();

  useEffect(() => {
    if (authLoading || roleLoading) {
      return;
    }

    if (requireAuth && !user) {
      router.push(redirectTo);
      return;
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const hasAccess = hasAnyRole(allowedRoles);
      
      if (!hasAccess) {
        router.push('/');
        return;
      }
    }
  }, [user, authLoading, roleLoading, allowedRoles, hasAnyRole, requireAuth, redirectTo, router]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasAccess = hasAnyRole(allowedRoles);
    
    if (!hasAccess) {
      const activeRoles = Object.entries(roles)
        .filter(([, value]) => value)
        .map(([key]) => key);

      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Your roles: {activeRoles.join(', ') || 'none'} | Required: {allowedRoles.join(', ')}
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

