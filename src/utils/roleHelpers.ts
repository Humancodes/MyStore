import type { UserRole } from '@/types/roles';

export function canAccessRoute(
  userRole: UserRole | undefined,
  allowedRoles: UserRole[]
): boolean {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
}

export function getRoleDisplayName(role: UserRole | undefined): string {
  switch (role) {
    case 'buyer':
      return 'Buyer';
    case 'seller':
      return 'Seller';
    case 'admin':
      return 'Admin';
    default:
      return 'User';
  }
}

export function isRoleHigherOrEqual(
  userRole: UserRole | undefined,
  requiredRole: UserRole
): boolean {
  if (!userRole) return false;

  const roleHierarchy: Record<UserRole, number> = {
    buyer: 1,
    seller: 2,
    admin: 3,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
