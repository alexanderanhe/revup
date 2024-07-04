import createIntlMiddleware from 'next-intl/middleware';
import { locales } from '@/i18n';
import { PUBLIC_ROUTES, DEFAULT_REDIRECT, ROOT, UNAUTHORIZED_REDIRECT } from '@/lib/routes';

import { auth } from '@/auth';


const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "es"
});

export default auth((request) => {
  const { nextUrl } = request;
  const session = request.auth;
  const isAuthenticated = !!session?.user;

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${PUBLIC_ROUTES
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const rootPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${ROOT === '/' ? '|/' : ROOT})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(
    // Ignoring the child pathnames
    nextUrl.pathname.split("/").slice(0, 3).join('/')
  );
  const isRootPage = rootPathnameRegex.test(nextUrl.pathname);

  if (isPublicPage && isAuthenticated && isRootPage) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }
  if (!isAuthenticated && !isPublicPage) {
    return Response.redirect(new URL(UNAUTHORIZED_REDIRECT, nextUrl));
  }
  return intlMiddleware(request);
})

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)']
  // Match only internationalized pathnames
  // matcher: ['/', '/(es|en)/:path*']
};