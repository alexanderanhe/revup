import type { NextAuthConfig } from 'next-auth';
// import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from './lib/routes';
// import { locales } from './i18n';
 
export const authConfig = {
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, cookies } }) {
      const isAuthenticated = !!auth?.user;
      const onBoarding = cookies.get('app.onboarding');
      console.log({onBoarding})
      return isAuthenticated;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;