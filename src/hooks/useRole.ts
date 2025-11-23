'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getUserRoles } from '@/services/roleService';
import { setUser } from '@/store/slices/authSlice';
import type { UserRole, UserRoles } from '@/types/roles';
import { DEFAULT_ROLES } from '@/types/roles';

export function useRole() {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const [roles, setRoles] = useState<UserRoles>(DEFAULT_ROLES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoles() {
      if (!user?.uid) {
        setRoles(DEFAULT_ROLES);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const userRoles = await getUserRoles(user.uid);
        setRoles(userRoles);

        if (
          userRoles &&
          JSON.stringify(user.roles) !== JSON.stringify(userRoles)
        ) {
          dispatch(setUser({ ...user, roles: userRoles }));
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
        setRoles(DEFAULT_ROLES);
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, [user?.uid, dispatch]);

  const isBuyer = roles.buyer === true;
  const isSeller = roles.seller === true;
  const isAdmin = roles.admin === true;

  const hasRole = (requiredRole: UserRole) => {
    return roles[requiredRole] === true;
  };

  const hasAnyRole = (requiredRoles: UserRole[]) => {
    return requiredRoles.some(role => roles[role] === true);
  };

  const hasAllRoles = (requiredRoles: UserRole[]) => {
    return requiredRoles.every(role => roles[role] === true);
  };

  return {
    roles,
    loading,
    isBuyer,
    isSeller,
    isAdmin,
    hasRole,
    hasAnyRole,
    hasAllRoles,
  };
}
