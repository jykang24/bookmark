import { auth } from '@/lib/auth';
import LogoutButton from './logout-btn';

export default async function Logout() {
  const session = await auth();
  console.log('logout session -', session);
  if (!session || !session.user) {
    return null;
  }

  return (
    <>
      Logout Page
      <LogoutButton provider={session?.user.provider} />
    </>
  );
}
