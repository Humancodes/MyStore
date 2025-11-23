'use client';

/**
 * AuthProvider Component
 * 
 * This component initializes Firebase authentication state
 * and syncs it with Redux store.
 * 
 * Should be placed inside QueryProvider and ReduxProvider
 * in your app layout.
 */

import { useAuthState } from '@/hooks/useAuthState';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // This hook listens to Firebase auth state changes
  // and automatically updates Redux store
  useAuthState();

  return <>{children}</>;
}

