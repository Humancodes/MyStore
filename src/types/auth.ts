import type { UserRoles } from './roles';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  roles?: UserRoles;
}
