import React, { FC } from "react";
import { FormProvider } from "react-hook-form";
import { useLoginForm } from "../hooks/use-login-form";
import { LoginForm } from "@/shared/ui";

export const Login: FC = () => {
    const form = useLoginForm();

    return (
        <FormProvider {...form}>
            <LoginForm
                onSubmit={form.handleSubmit((data) => console.log(data))}
                isPending={false}
            />
        </FormProvider>
    );
};
