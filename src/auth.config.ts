import type { NextAuthConfig } from 'next-auth';
import { APPCOOKIES, User } from '@/lib/definitions';
import { saveAssessmentById, saveOnBoarding } from '@/lib/data';
import { NextRequest } from 'next/server';
 
export const authConfig = (request?: NextRequest) => ({
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(request?.cookies.getAll())
      if (request && user && !(user as User)?.assessment && request.cookies.has(APPCOOKIES.ASSESSMENT)) {
        const assessmentId = request.cookies.get(APPCOOKIES.ASSESSMENT);
        await saveAssessmentById(assessmentId);
        request.cookies.delete(APPCOOKIES.ASSESSMENT)
      }
      if (request && user && !(user as User)?.onboarding && request.cookies.has(APPCOOKIES.ONBOARDING)) {
        await saveOnBoarding();
        request.cookies.delete(APPCOOKIES.ONBOARDING)
      }
      return true
    },
    authorized({ auth, request: { nextUrl, cookies } }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig);