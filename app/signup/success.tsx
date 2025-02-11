import Link from 'next/link';

export default function SignupSuccess() {
  return (
    <>
      <h1 className='text-3xl'>회원가입이 완료되었습니다.</h1>

      <Link href='/' className=' text-center w-full border border-black p-2'>
        홈 화면으로 가기
      </Link>
      <Link
        href='/login'
        className='text-center w-full border border-black p-2'
      >
        로그인 화면으로 가기
      </Link>
    </>
  );
}
