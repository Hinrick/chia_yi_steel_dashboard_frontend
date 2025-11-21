import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const token = request.cookies.get('authjs.session-token') ||
                request.cookies.get('__Secure-authjs.session-token');

  const isAuthenticated = !!token;
  const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const isOnLogin = request.nextUrl.pathname.startsWith('/login');

  // Redirect to login if accessing dashboard without auth
  if (isOnDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if accessing login while authenticated
  if (isOnLogin && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
