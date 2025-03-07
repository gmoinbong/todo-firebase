import React, { FC } from 'react'
import { FormProvider } from 'react-hook-form'
import { RegisterForm } from '@/shared/ui'
import { useRegisterForm } from '../hooks/use-register-form'


export const Register: FC = () => {
    const form = useRegisterForm()

    return (
        <FormProvider {...form}>
            <RegisterForm
                error=""
                onSubmit={form.handleSubmit((data) => console.log(data))}
                isPending={false}
            />
        </FormProvider>
    )
}