import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/src/server/db/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email dan Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            umkmProfile: true,
            driverProfile: true,
          },
        });

        if (!user || !user.isActive) {
          return null;
        }

        // TODO: Implement email verification system
        // For now, allow login with unverified emails
        // const userWithVerified = user as any;
        // if (!userWithVerified.emailVerified) {
        //   return null;
        // }

        const isPasswordValid = await compare(
          credentials.password,
          user.passwordHash,
        );

        if (!isPasswordValid) {
          return null;
        }

        // For UMKM and DRIVER, check if approved before allowing login
        if (user.role === "UMKM") {
          if (user.umkmProfile?.approvalStatus !== "APPROVED") {
            return null; // Block login if not approved
          }
        }

        if (user.role === "DRIVER") {
          if (user.driverProfile?.approvalStatus !== "APPROVED") {
            return null; // Block login if not approved
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as UserRole;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? token.sub ?? "";
        session.user.role = (token.role as UserRole) ?? UserRole.USER;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
};
