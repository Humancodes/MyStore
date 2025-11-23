import { auth } from '@/lib/firebase';
import { getIdToken } from 'firebase/auth';
import type { UserRole } from '@/types/roles';

export async function setUserRoleClient(role: UserRole): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User must be authenticated to set role');
  }

  try {
    const idToken = await getIdToken(user);
    const response = await fetch('/api/set-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user.uid,
        role,
        idToken,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to set role');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
}
