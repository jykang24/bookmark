import { Copyright } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import localFont from 'next/font/local';
import { auth } from '@/lib/auth';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'BookMark',
  description: 'Book & Mark',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const didLogin = !!session?.user?.name;
  console.log('layout - session:', session);
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className='flex justify-between mx-4 text-xl'>
          <Link href='/'>JY Bookmark</Link>
          <Link href={didLogin ? '/api/auth/signout' : '/api/auth/signin'}>
            {didLogin ? `${session.user?.name}님` : 'Login'}
          </Link>
        </header>
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
          <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
            {children}
          </main>
        </div>
        <footer className='flex gap-1 items-center justify-center'>
          <Copyright size={16} />
          Bookmark by Jiyeon
        </footer>
      </body>
    </html>
  );
}
