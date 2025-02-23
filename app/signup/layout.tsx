import { SessionProvider } from 'next-auth/react';

export default async function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}
