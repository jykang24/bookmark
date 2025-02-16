import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import WithdrawButton from './withdraw-btn';

export default async function Withdraw() {
  const session = await auth();
  console.log('withdraw session -', session);
  if (!session || !session.user) {
    console.log('No session in withdraw');
    redirect('/');
  }

  return (
    <>
      <h1 className='text-3xl'>회원 탈퇴</h1>
      {/* TODO:email수정 */}
      <WithdrawButton email='임시이메일' />
    </>
  );
}
