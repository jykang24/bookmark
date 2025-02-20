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
      <h1 className='text-3xl text-green-500'>Bookmark 서비스 회원 탈퇴</h1>
      <WithdrawButton email={session.user.email ?? '임시이메일'} />
    </>
  );
}
