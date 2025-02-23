'use server';

import { compare, hash } from 'bcryptjs';
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
  await signOut({ redirectTo: '/' });
};
export async function hashPassword(passwd: string) {
  return hash(passwd, 10);
}
// 비밀번호 비교 (해시값 검증)
// export async function comparePassword(passwd: string, hashedPasswd: string) {
//   return await compare(passwd, hashedPasswd);
// }
export const myLogin = async ({ email, password }: Props) => {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // 리다이렉션 비활성화
      callbackUrl: '/',
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
  provider,
}: {
  email: string;
  nickname: string;
  passwd?: string;
  provider: string;
}) => {
  try {
    if (provider === 'credentials' && passwd) {
      //passwd 암호화
      passwd = await hashPassword(passwd);
      const user = await prisma.user.create({
        data: {
          email,
          nickname,
          passwd,
          provider,
        },
      });
      console.log('insert credential user into User >>', user);
    } else {
      const user = await prisma.user.create({
        data: {
          email,
          nickname,
          provider,
        },
      });
      console.log('insert Oauth user into User >>', user);
    }
    return true;
  } catch (err) {
    console.log('insertUser error:', err);
    return false;
  }
};
//아이디로 회원정보 존재여부 검색
export const searchUser = async ({ email }: { email: string }) => {
  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existUser) {
      console.log('searchUser - existUser :', existUser);
      return true;
    } else {
      console.log('searchUser - no exist User');
      return false;
    }
  } catch (err) {
    console.log('searchUser Error', err);
    return false;
  }
};

export const getUser = async ({ email, password }: Props) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    }); //유저 존재하는지 체크

    if (!user) {
      console.log('아이디 입력오류 또는 존재하지 않는 사용자');
      return null;
    }
    //비밀번호 검증
    if (user && user.passwd) {
      const res = await compare(password, user.passwd);
      if (!res) {
        console.log('비밀번호 입력 오류');
        return null;
      }
    }
    console.log('getUser from DB >>', user);
    return user;
  } catch (err) {
    console.log('getUser error: ', err);
    return null;
  }
};

export const deleteUser = async ({ email }: { email: string }) => {
  try {
    await prisma.user.delete({
      where: {
        email,
      },
    });
    console.log('deleteUser completed');
    return true;
  } catch (err) {
    console.log('deleteUser error: ', err);
    return false;
  }
};
