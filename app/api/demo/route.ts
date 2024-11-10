import { auth } from '@/libs/auth';
import { NextResponse } from 'next/server';

export interface GlobalThis {
  EdgeRuntime: string;
}
declare const global: GlobalThis;

export const GET = auth(function GET(req) {
  if (req.auth || process.env.NODE_ENV === 'development') {
    if (typeof global.EdgeRuntime !== 'string') {
      return NextResponse.json({ message: 'EdgeRuntime is not a string' }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Authenticated and edge', EdgeRuntime: global.EdgeRuntime });
    }
  }
  return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
});