export type UserRole = 'buyer' | 'seller' | 'admin';

export interface UserRoles {
  buyer: boolean;
  seller: boolean;
  admin: boolean;
}

export interface UserRoleData {
  roles: UserRoles;
  sellerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const DEFAULT_ROLES: UserRoles = {
  buyer: true,
  seller: false,
  admin: false,
};

export const ROLES = {
  BUYER: 'buyer' as UserRole,
  SELLER: 'seller' as UserRole,
  ADMIN: 'admin' as UserRole,
} as const;
