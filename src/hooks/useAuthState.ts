'use client';

import { useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAppDispatch } from '@/store/hooks';
import { setUser, setLoading } from '@/store/slices/authSlice';
import { auth } from '@/lib/firebase';
import { getUserRoles } from '@/services/roleService';
import type { AuthUser } from '@/types/auth';

async function extractUserData(user: User | null): Promise<AuthUser | null> {
  if (!user) return null;

  const roles = await getUserRoles(user.uid);

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    roles,
  };
}

export function useAuthState() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      const userData = await extractUserData(user);
      dispatch(setUser(userData));
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);
}
