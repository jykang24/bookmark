'use client';

import { logout } from '@/actions/sign';
import { Button } from '@/components/ui/button';

export default function Logout() {
  const handleSignOut = async () => {
    try {
      await logout();
      //카카오 로그인만 해당, 로그아웃후 홈으로 이동
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=6f994604ee04079bb7bf38b54802d326&logout_redirect_uri=http://localhost:3000/`;
    } catch (err) {
      console.log('Error while signout>>', err);
    }
  };
  return (
    <>
      Logout Page
      <Button onClick={handleSignOut}>Sign out</Button>
    </>
  );
}
