'use client';

import { useAuthState } from '@/hooks/useAuthState';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthState();

  return <>{children}</>;
}

