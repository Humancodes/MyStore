export type UserRole = 'buyer' | 'seller' | 'admin';

export interface UserRoleData {
  role: UserRole;
  sellerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_ROLE: UserRole = 'buyer';

export const ROLES = {
  BUYER: 'buyer' as UserRole,
  SELLER: 'seller' as UserRole,
  ADMIN: 'admin' as UserRole,
} as const;
