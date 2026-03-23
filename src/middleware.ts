import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import type { UserRole } from "@prisma/client";

import { DASHBOARD_HOME_BY_ROLE } from "@/src/server/auth/roles";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/register-umkm",
  "/register-driver",
];

const AUTH_ONLY_ROUTES = [
  "/login",
  "/register",
  "/register-umkm",
  "/register-driver",
];

const ROLE_BASED_ROUTES: Record<UserRole, string[]> = {
  ADMIN: [
    "/dashboard-admin",
    "/admin",
    "/analytics",
    "/settings",
    "/laporan",
    "/transaksi",
    "/driver",
    "/users",
    "/gamification",
    "/validasi",
    "/academy-admin",
    "/umkm",
  ],
  USER: [
    "/dashboard-user",
    "/user",
    "/cart",
    "/checkout",
    "/marketplace",
    "/profile",
    "/history",
    "/articles",
    "/quest",
    "/game",
    "/mystery-box",
    "/chat",
    "/wishlist",
    "/orders",
    "/product",
  ],
  DRIVER: [
    "/dashboard-driver",
    "/driver",
    "/chat-driver",
    "/tracking",
    "/profile-driver",
    "/orders-active-driver",
    "/history-driver",
  ],
  UMKM: [
    "/dashboard-umkm",
    "/umkm",
    "/chat-umkm",
    "/profile-umkm",
    "/products-management",
    "/orders-management",
    "/academy",
    "/analysis-feedback",
    "/notifications",
  ],
};

function isPathAllowedForRole(pathname: string, role: UserRole): boolean {
  const allowedPaths = ROLE_BASED_ROUTES[role];
  return allowedPaths.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(path + "/") ||
      pathname.startsWith("/" + path.split("/")[1]),
  );
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

function isAuthOnlyRoute(pathname: string): boolean {
  return AUTH_ONLY_ROUTES.includes(pathname);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const userRole = token?.role as UserRole | undefined;

  if (isPublicRoute(pathname)) {
    if (isAuthenticated && isAuthOnlyRoute(pathname)) {
      const dashboardUrl = userRole ? DASHBOARD_HOME_BY_ROLE[userRole] : "/";
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (userRole && !isPathAllowedForRole(pathname, userRole)) {
    const dashboardUrl = DASHBOARD_HOME_BY_ROLE[userRole];
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
