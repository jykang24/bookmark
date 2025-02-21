import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user.email;
  const path = req.nextUrl.pathname;

  console.log('middle - session:', session);
  console.log('middle - didLogin:', didLogin);
  // if (session?.user.registRequired && path !== '/signup/agreement') {
  //   return NextResponse.redirect(new URL('/signup/agreement', req.url));
  // }
  if (!didLogin) {
    console.log('Not logined middle - session:', session);
    console.log('Not logined middle - didLogin:', didLogin);
    const callbackUrl = encodeURIComponent(path);

    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url)
    );
  }
  return NextResponse.next(); //json이면 끝내는거?
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|login|logout|api/regist|signup|withdraw|samples|$).*)',
  ],
};
