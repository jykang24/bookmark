import { getUser, searchUser } from '@/actions/sign';
import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';
import prisma from './db';
import { generateToken } from './utils';

declare module 'next-auth' {
  interface Session {
    user: {
      //session.user의 타입확장
      provider: string;
      registRequired?: boolean;
    } & DefaultSession['user'];
  }
}

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
            throw new Error(
              '아이디 또는 비밀번호가 틀렸거나 존재하지 않는 사용자입니다.'
            );
          }
          console.log('authroize user>>', user);
          return {
            id: user.id.toString(), //number id를 string으로 변환
            name: user.nickname,
            email: user.email,
            provider: user.provider,
          };
        } catch (err) {
          console.log('auth - getUsererror:', err);
          return null;
        }
      },
    }),
    Google,
    Github,
    Kakao,
    Naver,
  ],
  pages: {
    signIn: `/login`,
    signOut: `/logout`,
  },
  callbacks: {
    // async signIn({ account, profile }) {
    //   console.log('account', account);
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   console.log('redirect:', baseUrl);
    //   return baseUrl;
    // },
    async jwt({ token, account, profile, user, trigger }) {
      //TODO: isNewUser
      if (account || user) {
        if (!account) {
          console.log('로그인 시도 - no account', user);
        }
        if (account) {
          console.log('로그인 시도 - account존재:', account);

          if (account.provider !== 'credentials') {
            console.log('로그인 시도 - Oauth로그인');
            token.email = profile?.email || '임시이메일';
            const email = token.email;
            console.log('oauth account email -', email);
            //TODO: email 처리필요
            const existUser = await searchUser({ email });
            if (!existUser) {
              console.log(
                '가입되지 않은 사용자입니다. 회원 가입 페이지로 이동합니다.'
              );
              token.registRequired = true;
            }
            token.accessToken = account?.access_token || '';
            token.refreshToken = account?.refresh_token || '';
          } else {
            console.log('로그인 시도 - credentials로그인');
            //토큰 최초 발급
            token.accessToken = Date.now() + 60 * 60 * 24 * 1000; //만료시간 설정(24시간)
            const refreshToken = generateToken();
            const refreshTokenExp = new Date(
              Date.now() + 60 * 60 * 24 * 14 * 1000
            ); // 만료시간 설정(2주)
            try {
              await prisma.user.update({
                where: {
                  email: token.email || '임시이메일', //TODO: 수정필요
                },
                data: {
                  refreshToken,
                  refreshTokenExp,
                },
              });
              console.log('refreshToken saved');
            } catch (err) {
              console.log('refreshToken save Error:', err);
            }
          }
          token.provider = account.provider;
        }
        console.log('로그인 토큰 정보:', token);
        console.log('로그인 사용자 프로필 정보:', profile);
        console.log('로그인 유저 정보:', user);
      } else {
        console.log('세션 유지 - account없음, 기존토큰유지');

        if (token.provider === 'credentials') {
          const currentTime = Date.now();
          const currentDate = new Date(currentTime);
          //TODO: accesToken 타입 보완필요
          if (token.email && (token.accessToken as number) < Date.now()) {
            //액세스 토큰 만료시 refresh 토큰 체크
            const user = await prisma.user.findUnique({
              where: {
                email: token.email,
              },
            });
            if (
              user &&
              user.refreshToken &&
              user.refreshTokenExp &&
              user.refreshTokenExp > currentDate
            ) {
              token.accessToken = Date.now() + 60 * 60 * 24 * 1000; //refresh유효시 액세스 토큰 갱신
            } else {
              //refresh 토큰 만료시 로그아웃 처리필요
              token.error = 'refreshTokenExpired';
            }
          }
        }
      }

      if (trigger === 'update') {
        token.registRequired = false;
      }

      return token;
    },
    async session({ session, token }) {
      console.log('auth session:', session);
      console.log('auth token:', token);
      if (token.registRequired) {
        //회원가입 필요한 사용자
        return {
          ...session,
          user: {
            ...session.user,
            email: token.email,
            provider: token.provider,
            registRequired: true,
          },
        };
      }
      //TODO: refreshToken만료시 로그아웃 처리 필요
      // if (token.error) {
      //   session.user.error = token.error; // 클라이언트에서 로그아웃 처리 가능하도록 전달
      // }
      return {
        ...session,
        user: {
          ...session.user,
          provider: token.provider,
        },
      };
    },
  },
  events: {
    async signOut(events) {
      if ('token' in events && events.token) {
        console.log('로그아웃 이벤트 발생 - token:', events.token);

        if (events.token.provider === 'kakao') {
          //카카오 로그아웃 (1) 액세스 토큰 무효화 요청
          const response = await fetch(
            'https://kapi.kakao.com/v1/user/logout',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${events.token.accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          if (response.ok) {
            console.log('로그아웃 성공');
          } else {
            console.log('로그아웃 실패', await response.text());
          }
        }

        if (events.token.provider === 'credentials') {
          console.log('credentials 로그아웃');

          await prisma.user.update({
            where: {
              email: events.token.email || '임시이메일', //TODO: 수정필요
            },
            data: {
              refreshToken: null,
              refreshTokenExp: null,
            },
          });
        }
      } else {
        console.log('로그아웃 이벤트 발생 - session만');
        return;
      }
    },
  },
  trustHost: true,
  session: {
    strategy: 'jwt', // JWT를 사용하는지 확인
    maxAge: 60 * 60 * 24 * 14, //토큰 만료시간 설정 (2주)
  },
});
