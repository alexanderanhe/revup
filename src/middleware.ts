import createIntlMiddleware from 'next-intl/middleware';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { PUBLIC_ROUTES } from './lib/routes'
import { locales } from './i18n'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "es"
});

const publicPathnameRegex = RegExp(
  `^(/(${locales.join('|')}))?(${PUBLIC_ROUTES
    .flatMap((p) => (p === '/' ? ['', '/'] : p))
    .join('|')})/?$`,
  'i'
);
const isPublicRoute = createRouteMatcher([
  publicPathnameRegex,
  '/api(.*)',
]);

// const isProtectedRoute = createRouteMatcher([
//   "/:locale/dashboard(.*)",
//   "/:locale/my-account(.*)",
// ]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  // do not localize api routes
  const path = request.nextUrl.pathname;
  if (path.includes("/api")) {
    return;
  }

  return intlMiddleware(request);
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|json)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

// export const config = {
//   matcher: "/((?!static|.*\\..*|_next).*)",
// };