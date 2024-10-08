import type { NextAuthConfig } from 'next-auth';
import { User } from '@/lib/definitions';
import { checkUserPlanExists, getUserInfo } from '@/lib/data';
 
export const authConfig = {
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    async signIn({ profile }) {
      // return profile?.email?.endsWith("@yourdomain.com")
      return true;
    },
    authorized({ auth, request: { nextUrl, cookies } }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      (session.user as User).info = await getUserInfo(user.id);
      await checkUserPlanExists(user.id);
      return session
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;