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
        nickname: nickname || '임시닉네임',
        email: email || '임시이메일', //TODO: 수정필요
        provider,
      });
      console.log('insertUser result-', res);
      await update({ registRequired: false }); //토큰 및 세션 업데이트
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
      alert('회원가입이 정상적으로 처리되었습니다. 홈으로 이동합니다.');
      redirect('/');
    }
  }, [session, status]);
  return (
    <>
      <h1 className='text-3xl'>소셜로그인 개인정보 제3자 제공 동의</h1>
      <div>
        <p>✅ [필수] 필수 제공 항목 : 프로필 정보(닉네임), 이메일</p>
      </div>
      <div className='w-full h-[1px] border border-slate-500 border-dashed'></div>

      <h1 className='text-3xl'>Bookmark 서비스 동의</h1>

      <p>Bookmark 서비스를 이용하기 위해 개인정보 수집 동의가 필요합니다. </p>
      <p>✅ [필수] 개인정보 수집 · 이용 동의</p>

      <Button onClick={registUser} className='w-full'>
        동의하고 가입하기
      </Button>
    </>
  );
}
