import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await auth();

  const themePreference = request.cookies.get('theme');
  if (!themePreference) {
    response.cookies.set('theme', 'light');
  }

  // request.nextUrl.pathname.startsWith('/profile')
  if (session && (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/login')) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  return response;
}
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};