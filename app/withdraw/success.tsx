import Link from 'next/link';

export default function WithdrawSuccess() {
  return (
    <>
      <h1 className='text-3xl'>회원탈퇴가 완료되었습니다.</h1>

      <Link href='/' className=' text-center w-full border border-black p-2'>
        홈 화면으로 가기
      </Link>
    </>
  );
}
