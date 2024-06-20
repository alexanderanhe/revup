import createIntlMiddleware from 'next-intl/middleware';
import { locales } from '@/i18n';
import { PUBLIC_ROUTES, DEFAULT_REDIRECT, ROOT } from '@/lib/routes';

import { auth } from '@/auth';


const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en'
});
 
// // This function can be marked `async` if using `await` inside
// export default async function middleware() {

//   return authMiddleware(async (request: NextRequest) => {
//     const { nextUrl } = request;
//     // if (
//     //   request.nextUrl.pathname.startsWith('/_next') ||
//     //   request.nextUrl.pathname.includes('/api/') ||
//     //   PUBLIC_FILE.test(request.nextUrl.pathname)
//     // ) {
//     //   return
//     // }
  
//     // if (request.nextUrl.locale === 'default') {
//     //   const locale = request.cookies.get('NEXT_LOCALE')?.value || 'es';
  
//     //   return NextResponse.redirect(
//     //     new URL(`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
//     //   )
//     // }
  
//     // const response = NextResponse.next();
//     // const session = await auth();
  
//     // const themePreference = request.cookies.get('app.theme');
//     // !themePreference && response.cookies.set('app.theme', 'light');
  
//     // console.log(request.nextUrl.pathname)
//     // const onBoarding = request.cookies.has('app.onboarding');
//     // if (!onBoarding && !['/', '/on-boarding/', '/assessment/', '/login/'].includes(request.nextUrl.pathname)) {
//     //   return NextResponse.redirect(new URL(`/es/on-boarding`, request.url))
//     // }
  
//     // if (session && onBoarding && ['/', '/login'].includes(request.nextUrl.pathname)) {
//     //   // request.nextUrl.pathname.startsWith('/profile')
//     //   return NextResponse.redirect(new URL('/home', request.url))
//     // }
//     // return response;
  
//     // const publicPathnameRegex = RegExp(
//     //   `^(/(${locales.join('|')}))?(${PUBLIC_ROUTES
//     //     .flatMap((p) => (p === '/' ? ['', '/'] : p))
//     //     .join('|')})/?$`,
//     //   'i'
//     // );
//     // const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);
//     // if (isPublicPage) {
//     //   return intlMiddleware(request);
//     // }
//     // return (authMiddleware as any)(request);
//     const session = await auth();
//     const isAuthenticated = !!session?.user;
  
//     const publicPathnameRegex = RegExp(
//       `^(/(${locales.join('|')}))?(${PUBLIC_ROUTES
//         .flatMap((p) => (p === '/' ? ['', '/'] : p))
//         .join('|')})/?$`,
//       'i'
//     );
//     const rootPathnameRegex = RegExp(
//       `^(/(${locales.join('|')}))?(${ROOT === '/' ? '|/' : ROOT})/?$`,
//       'i'
//     );
//     const isPublicPage = publicPathnameRegex.test(nextUrl.pathname);
//     const isRootPage = rootPathnameRegex.test(nextUrl.pathname);
//     console.log({isPublicPage, isRootPage, isAuthenticated, pathname: nextUrl.pathname, ROOT})
//     if (isPublicPage && isAuthenticated && isRootPage) {
//       return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
//     }
//     if (!isAuthenticated && !isPublicPage) {
//       return Response.redirect(new URL(ROOT, nextUrl));
//     }
//   });
// }

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
  const isPublicPage = publicPathnameRegex.test(nextUrl.pathname);
  const isRootPage = rootPathnameRegex.test(nextUrl.pathname);

  if (isPublicPage && isAuthenticated && isRootPage) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }
  if (!isAuthenticated && !isPublicPage) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }
  return intlMiddleware(request);
})

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)']
  // Match only internationalized pathnames
  // matcher: ['/', '/(es|en)/:path*']
};