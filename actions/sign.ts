'use server';

import { signIn } from '@/lib/auth';

export const login = async (service: string) => {
  await signIn(service);
};
