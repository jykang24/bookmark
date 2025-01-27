'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from '@/lib/i18n-zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormFieldInput from '@/components/ui/form-field-input';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8), //글자수제한시 max
  confirmPassword: z.string().min(8),
});
type FormSchemaType = z.infer<typeof FormSchema>; //유틸리티타입처럼 자동으로타입 만들어줌

export default function Signup() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = (values: FormSchemaType) => {
    if (values.password !== values.confirmPassword) {
      return alert(
        'Password does not match. Please check your password again.'
      );
    }
    console.log('Signup submitted:', values);
    //TODO: db로 데이터 push
  };

  return (
    <>
      <h1 className='text-3xl'>Sign Up page</h1>
      <Form {...form}>
        <form className='space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
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
          {/* password와 confirmPassword 일치확인필요 */}
          {/* 개인정보 동의 체크 */}
          <Button type='submit' className='w-full'>
            Sign Up
          </Button>
        </form>
      </Form>
    </>
  );
}
