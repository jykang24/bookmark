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
        // 이메일과 패스워드 확인하는 로직 필요 (데이터베이스에서 사용자 인증)

        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        console.log('auth - credentials:', credentials);
        const user = {
          id: '2',
          email: credentials.email,
          name: 'Hong',
        } as User; // 임시 - 유저 객체 생성

        return user;
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
    async signIn({ account, profile }) {
      console.log('account', account);
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user }) {
      console.log('auth session:', session);
      console.log('auth user:', user);
      //session.user = user
      return session;
    },
  }, //login하고 나서
  trustHost: true,
  session: {
    strategy: 'jwt', // JWT를 사용하는지 확인
  },
});
