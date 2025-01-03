import NextAuth from 'next-auth';
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
  providers: [Google, Github, Kakao, Naver],
  pages: {
    signIn: `/login`,
  },
  callbacks: {
    async signIn({ account, profile }) {
      console.log('account', account);
      return true;
    },
    async session({ session, user }) {
      console.log('auth session:', session);
      console.log('auth user:', user);
      //session.user = user
      return session;
    },
  }, //login하고 나서
  trustHost: true,
});
