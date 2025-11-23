import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserRole, UserRoles, UserRoleData } from '@/types/roles';
import { DEFAULT_ROLES } from '@/types/roles';

export async function getUserRoles(uid: string): Promise<UserRoles> {
  try {
    const roleDoc = doc(db, 'userRoles', uid);
    const roleSnap = await getDoc(roleDoc);

    if (roleSnap.exists()) {
      const data = roleSnap.data() as UserRoleData;
      return data.roles || DEFAULT_ROLES;
    }

    const roleData: UserRoleData = {
      roles: DEFAULT_ROLES,
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
    };

    await setDoc(roleDoc, roleData);
    return DEFAULT_ROLES;
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return DEFAULT_ROLES;
  }
}

export async function addUserRole(
  uid: string,
  role: UserRole,
  sellerId?: string
): Promise<void> {
  try {
    const roleDoc = doc(db, 'userRoles', uid);
    const existingDoc = await getDoc(roleDoc);

    if (!existingDoc.exists()) {
      const roleData: UserRoleData = {
        roles: { ...DEFAULT_ROLES, [role]: true },
        ...(sellerId && { sellerId }),
        createdAt: serverTimestamp() as any,
        updatedAt: serverTimestamp() as any,
      };
      await setDoc(roleDoc, roleData);
    } else {
      const currentData = existingDoc.data() as UserRoleData;
      const updatedRoles = {
        ...currentData.roles,
        [role]: true,
      };
      await updateDoc(roleDoc, {
        roles: updatedRoles,
        ...(sellerId && { sellerId }),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error adding user role:', error);
    throw error;
  }
}

export async function removeUserRole(
  uid: string,
  role: UserRole
): Promise<void> {
  try {
    const roleDoc = doc(db, 'userRoles', uid);
    const existingDoc = await getDoc(roleDoc);

    if (existingDoc.exists()) {
      const currentData = existingDoc.data() as UserRoleData;
      const updatedRoles = {
        ...currentData.roles,
        [role]: false,
      };
      await updateDoc(roleDoc, {
        roles: updatedRoles,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error removing user role:', error);
    throw error;
  }
}

export async function setUserRoles(
  uid: string,
  roles: Partial<UserRoles>,
  sellerId?: string
): Promise<void> {
  try {
    const roleDoc = doc(db, 'userRoles', uid);
    const existingDoc = await getDoc(roleDoc);

    if (!existingDoc.exists()) {
      const roleData: UserRoleData = {
        roles: { ...DEFAULT_ROLES, ...roles },
        ...(sellerId && { sellerId }),
        createdAt: serverTimestamp() as any,
        updatedAt: serverTimestamp() as any,
      };
      await setDoc(roleDoc, roleData);
    } else {
      const currentData = existingDoc.data() as UserRoleData;
      const updatedRoles = {
        ...currentData.roles,
        ...roles,
      };
      await updateDoc(roleDoc, {
        roles: updatedRoles,
        ...(sellerId && { sellerId }),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error setting user roles:', error);
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
