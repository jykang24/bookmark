'use client';

import { LogIn } from 'lucide-react';
import { FormEvent, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type Props = {
  signin: (service: string) => void;
};
export default function Login({ signin }: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin('google');
  };

  return (
    <>
      <form onSubmit={login} className='flex flex-col space-y-5'>
        <Label htmlFor='email'>
          Email
          <Input id='email' ref={emailRef} />
        </Label>

        <Label htmlFor='passwd'>
          Password
          <Input id='passwd' type='password' ref={pwdRef} />
        </Label>

        <Button>
          <LogIn />
          Sign In
        </Button>
      </form>

      <div>
        <Button>Google</Button>
      </div>
    </>
  );
}
