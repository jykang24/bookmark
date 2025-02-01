import { getUser } from '@/actions/sign';
import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        console.log('auth - credentials:', credentials);

        // 이메일과 패스워드 확인 (데이터베이스에서 사용자 인증)
        try {
          const user = await getUser({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (!user) {
            return null;
          }
          console.log('authroize user>>', user);
          return {
            id: user.id.toString(), //number id를 string으로 변환
            name: user.nickname,
            email: user.email,
          };
        } catch (err) {
          console.log('auth - getUsererror:', err);
          return null;
        }
        // const user = {
        //   id: '2',
        //   email: credentials.email,
        //   name: 'Hong',
        // } as User; // 임시 - 유저 객체 생성
      },
    }),
    Google,
    Github,
    Kakao,
    Naver,
  ],
  pages: {
    signIn: `/login`,
  },
  callbacks: {
    // async signIn({ account, profile }) {
    //   console.log('account', account);
    //   return true;
    // },
    async redirect({ url, baseUrl }) {
      console.log('redirect:', baseUrl);
      return baseUrl;
    },
    jwt({ token, account, profile }) {
      if (account) {
        console.log('로그인 시도 - account존재:', account);
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
        console.log('로그인 토큰 정보:', token);
        console.log('로그인 사용자 정보:', profile);
      } else {
        console.log('세션 유지 - account없음,기존토큰유지');
      }

      return token;
    },
    async session({ session, token }) {
      console.log('auth session:', session);
      console.log('auth token:', token);
      //console.log('auth user:', user); //oauth일때만
      //session.user = user; //세션에 유저정보 저장
      //TODO: 강제로 session user email 넣어줌, 없으면 사용자이름이 안뜬다..
      session.user.email = '임시이메일';
      return session;
    },
  },
  trustHost: true,
  session: {
    strategy: 'jwt', // JWT를 사용하는지 확인
  },
});
