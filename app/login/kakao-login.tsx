'use client';

import { login } from '@/actions/sign';
import { Button } from '@/components/ui/button';

export default function KakaoLogin() {
  //best
  return <Button onClick={() => login('kakao')}>SignIn with Kakao</Button>;
}
