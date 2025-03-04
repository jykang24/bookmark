import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import CredentialLogin from './credential-login';
import OAuthLogin from './oauth-login';

export default async function Login() {
  const session = await auth();
  console.log('login - session:', session);

  if (session && session !== undefined) {
    if (session.user.registRequired) {
      console.log('가입되지 않은 사용자입니다. 회원 가입 페이지로 이동합니다');
      redirect('/signup/agreement');
    }
    //로그인 후 홈으로 리다이렉트
    else {
      console.log('Now Logined, redirect to Home...');
      redirect('/');
    }
  }

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='flex justify-center text-2xl text-center'>Login</h1>
      <CredentialLogin />
      <OAuthLogin />
      <div className='w-full h-[1px] border border-black border-dashed'></div>
      <Link href='/signup' className='text-xl w-full'>
        Sign up →
      </Link>
    </div>
  );
}
