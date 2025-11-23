import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserRole, UserRoleData } from '@/types/roles';
import { DEFAULT_ROLE } from '@/types/roles';

export async function getUserRole(uid: string): Promise<UserRole> {
  try {
    const roleDoc = await getDoc(doc(db, 'userRoles', uid));
    if (roleDoc.exists()) {
      const data = roleDoc.data() as UserRoleData;
      return data.role || DEFAULT_ROLE;
    }
    return DEFAULT_ROLE;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return DEFAULT_ROLE;
  }
}

export async function setUserRole(
  uid: string,
  role: UserRole,
  sellerId?: string
): Promise<void> {
  try {
    const roleData: UserRoleData = {
      role,
      ...(sellerId && { sellerId }),
      updatedAt: serverTimestamp() as any,
    };

    const roleDoc = doc(db, 'userRoles', uid);
    const existingDoc = await getDoc(roleDoc);

    if (!existingDoc.exists()) {
      roleData.createdAt = serverTimestamp() as any;
    }

    await setDoc(roleDoc, roleData, { merge: true });
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
}

export async function getUserRoleData(
  uid: string
): Promise<UserRoleData | null> {
  try {
    const roleDoc = await getDoc(doc(db, 'userRoles', uid));
    if (roleDoc.exists()) {
      return roleDoc.data() as UserRoleData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user role data:', error);
    return null;
  }
}
