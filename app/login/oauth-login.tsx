'use client';

import { login } from '@/actions/sign';
import { Button } from '@/components/ui/button';

export default function OAuthLogin() {
  return (
    <div className='flex gap-2'>
      <Button onClick={() => login('google')}>Google</Button>
      <Button onClick={() => login('github')}>Github</Button>
      <Button onClick={() => login('kakao')}>Kakao</Button>
      <Button onClick={() => login('kakao')}>Naver</Button>
    </div>
  );
}
