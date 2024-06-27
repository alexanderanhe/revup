import type { NextAuthConfig } from 'next-auth';
import { User } from '@/lib/definitions';
import { getUserInfo } from '@/lib/data';
 
export const authConfig = {
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, cookies } }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      (session.user as User).info = await getUserInfo(user.id);
      console.log({ user });
      return session
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;