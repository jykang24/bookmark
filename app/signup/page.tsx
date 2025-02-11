'use client';

import { insertUser, searchUser } from '@/actions/sign';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from '@/lib/i18n-zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormFieldInput from '@/components/ui/form-field-input';
import SignupSuccess from './success';

const FormSchema = z.object({
  nickname: z.string(),
  email: z.string().email(),
  password: z.string().min(8), //글자수제한시 max
  confirmPassword: z.string().min(8),
});
type FormSchemaType = z.infer<typeof FormSchema>; //유틸리티타입처럼 자동으로타입 만들어줌

export default function Signup() {
  const [isSubmitted, setSubmit] = useState(false);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (values: FormSchemaType) => {
    if (values.password !== values.confirmPassword) {
      return alert(
        'Password does not match. Please check your password again.'
      );
    }
    //회원가입 중복방지
    const existUser = await searchUser({ email: values.email });

    if (existUser) {
      return alert('이미 존재하는 사용자입니다!');
    }

    //회원가입 처리
    console.log('Signup submitted:', values);
    // 1) db로 데이터 push
    await insertUser({
      email: values.email,
      nickname: values.nickname,
      passwd: values.password,
      provider: 'credentials',
    });
    // 2) submit완료 처리, success 화면
    setSubmit((prev) => !prev);
  };
  return (
    <>
      {isSubmitted ? (
        <SignupSuccess />
      ) : (
        <>
          <h1 className='text-3xl text-center'>회원 가입</h1>
          <Form {...form}>
            <form className='space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
              <FormFieldInput
                form={form}
                label='Nickname'
                name='nickname'
                type='text'
                placeholder='Nickname...'
              />
              <FormFieldInput
                form={form}
                label='Email'
                name='email'
                type='email'
                placeholder='email...'
              />
              <FormFieldInput
                form={form}
                label='Password'
                name='password'
                type='password'
                placeholder='password...'
              />
              <FormFieldInput
                form={form}
                label='Confirm Password'
                name='confirmPassword'
                type='password'
                placeholder='Confirm password...'
              />
              {/* 개인정보 동의 체크 */}
              <Button type='submit' className='w-full'>
                Sign Up
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
}
