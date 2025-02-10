'use client';

import { logout } from '@/actions/sign';
import { Button } from '@/components/ui/button';

type Props = {
  provider: string;
};

export default function LogoutButton({ provider }: Props) {
  const handleSignOut = async () => {
    try {
      await logout();
      console.log('logout 성공');
      if (provider === 'kakao') {
        //카카오 로그인만 해당, 서버 로그아웃후 홈으로 이동
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=6f994604ee04079bb7bf38b54802d326&logout_redirect_uri=http://localhost:3000/`;
      }
      if (provider === 'github') {
        window.location.href = 'https://github.com/logout';
      }
      if (provider === 'google') {
        window.location.href = 'https://accounts.google.com/logout';
      }
    } catch (err) {
      console.log('Error while logout>>', err);
    }
  };

  return <Button onClick={handleSignOut}>Sign out</Button>;
}
