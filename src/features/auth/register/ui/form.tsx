import React, { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Form } from '@/shared/ui/Form';
import { FormInput } from '@/shared/ui/FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/ui';
import { EmailRegisterSchema, emailRegisterSchema } from '../lib';
import { RegisterType, useRegister } from '../model';
import { handleErrorMessage } from '@/shared';
import { useAuthRedirect } from '@/shared/hooks/use-auth-redirect';


export const RegisterForm: FC = () => {
  const form = useForm<EmailRegisterSchema>({ resolver: zodResolver(emailRegisterSchema) })

  const { formState: { errors }, handleSubmit } = form;

  const register = useRegister(RegisterType.EMAIL)
  useAuthRedirect();

  const onSubmit: SubmitHandler<EmailRegisterSchema> = async (data) => {
    try {
      if (!register) return;

      await register(data.email, data.password, data.name)
    }
    catch (error: unknown) {
      handleErrorMessage(error)
    }
  }

  return (
    <FormProvider {...form}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder="Enter your name"
          required
        />
        {errors.name &&
          <p className="text-red-500 text-sm">
            {errors.name.message as string}
          </p>}

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
        {errors.email &&
          <p className="text-red-500 text-sm">
            {errors.email.message as string}
          </p>}

        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />
        {errors.password &&
          <p className="text-red-500 text-sm">
            {errors.password.message as string}
          </p>}

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
        />
        {errors.confirmPassword &&
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message as string}
          </p>}

        <Button
          text={"Register"}
          type="submit"
        />

      </Form>
    </FormProvider>
  );
};
