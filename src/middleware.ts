import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await auth();

  const themePreference = request.cookies.get('app.theme');
  !themePreference && response.cookies.set('app.theme', 'light');

  const onBoarding = request.cookies.has('app.onboarding');
  !onBoarding && ['/assessment'].includes(request.nextUrl.pathname) && response.cookies.set('app.onboarding', '1');
  if (!onBoarding && !['/', '/on-boarding', '/assessment', '/login'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/on-boarding', request.url))
  }

  if (session && onBoarding && ['/', '/login'].includes(request.nextUrl.pathname)) {
    // request.nextUrl.pathname.startsWith('/profile')
    return NextResponse.redirect(new URL('/home', request.url))
  }
  return response;
}
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico|).*)"],
  matcher: ["/", "/on-boarding", "/home", "/assessment", "/profile", "/login", "/on-demand"],
};