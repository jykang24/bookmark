'use client';

import { myLogin as login } from '@/actions/sign';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { z } from '@/lib/i18n-zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import FormFieldInput from '@/components/ui/form-field-input';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8), //글자수제한시 max
});

type FormSchemaType = z.infer<typeof FormSchema>; //유틸리티타입처럼 자동으로타입 만들어줌

export default function CredentialLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 로그인 페이지에 남아 있는 callbackUrl 정리
    const callbackUrl = searchParams.get('callbackUrl');
    if (callbackUrl?.includes('/login')) {
      router.replace('/login'); // 로그인 페이지 URL 정리
    }
  }, [searchParams, router]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    console.log('Credential-login values:', values); //로그인테스트용 콘솔출력
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      });
      if (!res) {
        return alert('아이디 또는 비밀번호가 틀렸습니다.');
      }
      console.log('login result :', res);
    } catch (error) {
      console.error('Error while login :', error);
    }
  };

  return (
    <>
      <h1 className='text-2xl'></h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='email address...'
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormFieldInput
            form={form}
            label='password'
            name='password'
            type='password'
            placeholder='password...'
          />
          <Button type='submit' className='w-full'>
            Login <LogIn />
          </Button>
        </form>
      </Form>
    </>
  );
}
