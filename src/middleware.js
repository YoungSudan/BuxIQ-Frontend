import { NextResponse } from 'next/server';

export function middleware(request) {  
  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/settings'], // Paths requiring authentication
};
