'use client';

import { deleteUser } from '@/actions/sign';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import WithdrawSuccess from './success';

type Props = {
  email: string;
};
export default function WithdrawButton({ email }: Props) {
  const [isSubmitted, setSubmit] = useState(false);
  const handleClick = async () => {
    //TODO: 로그아웃처리필요
    const isDeleting = confirm('정말로 회원 탈퇴할까요?');
    if (isDeleting) {
      await deleteUser({ email });
      setSubmit((prev) => !prev);
    }
  };
  return (
    <>
      {isSubmitted ? (
        <WithdrawSuccess />
      ) : (
        <>
          <p>탈퇴 전 다음 내용을 반드시 확인해주세요.</p>
          <div className='flex flex-col gap-2'>
            <p>✅ 회원 탈퇴 시, 더 이상 Bookmark 서비스 사용이 불가합니다.</p>
            <p>✅ 저장된 정보는 모두 삭제되며 복구할 수 없습니다.</p>
          </div>
          <Button className='w-full' onClick={handleClick}>
            동의하고 탈퇴하기
          </Button>
        </>
      )}
    </>
  );
}
