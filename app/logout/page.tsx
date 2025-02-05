'use client';

import { logout } from '@/actions/sign';
import { Button } from '@/components/ui/button';

export default function Logout() {
  const handleSignOut = async () => {
    logout();
    window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=6f994604ee04079bb7bf38b54802d326&logout_redirect_uri=http://localhost:3000/`;
    //qqq
  };
  return (
    <>
      Logout Page
      <Button onClick={handleSignOut}>Sign out</Button>
    </>
  );
}
