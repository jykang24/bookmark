'use client';

import { Button } from '@/components/ui/button';

type Props = {
  githubLogin: () => void;
};

export default function GithubLogin({ githubLogin }: Props) {
  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault(); //클라이언트에서 막은것
          githubLogin(); //서버에서 실행
        }}
      >
        Sign In with Github
      </Button>
    </>
  );
}
