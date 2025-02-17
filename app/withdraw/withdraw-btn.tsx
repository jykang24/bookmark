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
    //TODO: confirm alert추가, 로그아웃처리필요
    await deleteUser({ email });
    setSubmit((prev) => !prev);
  };
  return (
    <>
      {isSubmitted ? (
        <WithdrawSuccess />
      ) : (
        <Button onClick={handleClick}>탈퇴하기</Button>
      )}
    </>
  );
}
