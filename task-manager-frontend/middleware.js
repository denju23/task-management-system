import { NextResponse } from 'next/server';
import { decodeToken } from './lib/jwtUtils'; // create this helper

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // optional: decode and block user from accessing admin-only page
  // const user = decodeToken(token); 
  // if (request.nextUrl.pathname.startsWith('/admin') && user?.role !== 'admin') {
  //   return NextResponse.redirect(new URL('/unauthorized', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // apply to dashboard and all subpaths
};
