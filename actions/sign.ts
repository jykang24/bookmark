'use server';

import { hash } from 'bcrypt';
import { signIn } from '@/lib/auth';

type Props = {
  email: string;
  password: string;
};
export const login = async (service: string) => {
  await signIn(service);
};
export async function hashPassword(passwd: string) {
  return hash(passwd, 10);
}
export const myLogin = async ({ email, password }: Props) => {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // 리다이렉션 비활성화
    });

    console.log('myLogin result:', result); //성공시 res로 url을 반환
    return result;
  } catch (err) {
    console.log('myLogin error:', err);
    return null;
  }
};
