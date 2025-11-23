'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { getUserRole } from '@/services/roleService';
import type { UserRole } from '@/types/roles';
import { DEFAULT_ROLE } from '@/types/roles';

export function useRole() {
  const user = useAppSelector(state => state.auth.user);
  const [role, setRole] = useState<UserRole>(DEFAULT_ROLE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (!user?.uid) {
        setRole(DEFAULT_ROLE);
        setLoading(false);
        return;
      }

      if (user.role) {
        setRole(user.role);
        setLoading(false);
        return;
      }

      try {
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
      } catch (error) {
        console.error('Error fetching role:', error);
        setRole(DEFAULT_ROLE);
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [user]);

  const isBuyer = role === 'buyer';
  const isSeller = role === 'seller';
  const isAdmin = role === 'admin';
  const hasRole = (requiredRole: UserRole) => role === requiredRole;
  const hasAnyRole = (roles: UserRole[]) => roles.includes(role);

  return {
    role,
    loading,
    isBuyer,
    isSeller,
    isAdmin,
    hasRole,
    hasAnyRole,
  };
}
