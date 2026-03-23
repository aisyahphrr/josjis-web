import { UserRole } from "@prisma/client";

export const PUBLIC_REGISTRATION_ROLES = [
  UserRole.USER,
  UserRole.UMKM,
  UserRole.DRIVER,
] as const;

export const DASHBOARD_HOME_BY_ROLE: Record<UserRole, string> = {
  [UserRole.ADMIN]: "/dashboard-admin",
  [UserRole.USER]: "/dashboard-user",
  [UserRole.DRIVER]: "/dashboard-driver",
  [UserRole.UMKM]: "/dashboard-umkm",
};

export function isRoleAllowed(
  role: UserRole | undefined,
  allowedRoles: readonly UserRole[],
) {
  return Boolean(role && allowedRoles.includes(role));
}
