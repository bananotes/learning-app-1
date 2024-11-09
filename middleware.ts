// import { auth } from '@/libs/auth';
import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import connect, { GlobalWithMongoose } from '@/libs/mongodb';

// declare const global: GlobalWithMongoose;

// if (!global.mongoose) {
//   global.mongoose = {
//     conn: null,
//     promise: null,
//   };
// }

export async function middleware() {
// export async function middleware(request: NextRequest) {
  try {
    // Ensure database connection for API routes
    // if (request.nextUrl.pathname.startsWith('/api')) {
    //   if (!global.mongoose?.conn) {
    //     await connect();
    //   }
    // }

    // auth((req) => {
    //   if (!req.auth && req.nextUrl.pathname !== '/login') {
    //     const newUrl = new URL('/login', req.nextUrl.origin);
    //     return Response.redirect(newUrl);
    //   }
    // });

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.error();
  }
}
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};