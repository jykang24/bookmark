'use client';

import { insertUser } from '@/actions/sign';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Agreement() {
  const { data: session, status, update } = useSession();

  const registUser = async () => {
    if (session && session.user) {
      const { name: nickname, email, provider } = session.user;

      const res = await insertUser({
        nickname: nickname || ' ',
        email: email || '', //TODO: 수정필요
        provider,
      });
      console.log('insertUser result-', res);
      //TODO: update 동작확인후 수정하기
      await update(); //토큰 및 세션 업데이트
      console.log('회원가입이 완료되었습니다.');
    } else {
      console.log('Signup-agree - No session');
      return null;
    }
  };
  useEffect(() => {
    console.log('Signup-agree session:', session);
    //세션로딩이 완료되었을때만 체크
    if (status === 'authenticated' && !session?.user.registRequired) {
      redirect('/');
    }
  }, [session, status]);
  return (
    <>
      <h1 className='text-3xl'>개인정보 수집 동의화면</h1>
      <Button onClick={registUser}>동의하기</Button>
    </>
  );
}
