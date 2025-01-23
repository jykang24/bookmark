'use client';

import { myLogin as login } from '@/actions/sign';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
      console.log('login result :', res);
      //window.location.href = '/';
    } catch (error) {
      console.error('Error while login :', error);
    }
  };

  return (
    <>
      <h1 className='text-2xl'>Credential login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            name='password'
            type='password'
            placeholder='password...'
          />
          <Button type='submit'>Login</Button>
        </form>
      </Form>
    </>
  );
}
