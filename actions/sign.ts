'use server';

import { hash } from 'bcrypt';
import { signIn, signOut } from '@/lib/auth';
import prisma from '@/lib/db';

type Props = {
  email: string;
  password: string;
};
export const login = async (service: string) => {
  await signIn(service);
};
export const logout = async () => {
  await signOut();
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

export const insertUser = async ({
  email,
  nickname,
  passwd,
}: {
  email: string;
  nickname: string;
  passwd: string;
}) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        nickname,
        passwd,
      },
    });
    console.log('insert user into User >>', user);
  } catch (err) {
    console.log('insertUser error:', err);
  }
};

export const getUser = async ({ email, password }: Props) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    }); //유저 존재하는지 체크

    if (!user || user.passwd !== password) {
      //비밀번호 검증
      console.log('아이디 또는 비밀번호가 틀렸습니다.');
      return null;
    }
    console.log('getUser from DB >>', user);
    return user;
  } catch (err) {
    console.log('getUser error: ', err);
    return null;
  }
};
