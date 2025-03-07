import { Button } from "@/shared/ui";
import { Form } from "@/shared/ui/Form";
import { FormInput } from "@/shared/ui/FormInput";
import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleErrorMessage } from "@/shared";
import { LoginType, useLogin } from "../model/use-login";
import { useAuthRedirect } from "@/shared/hooks/use-auth-redirect";
import { Link } from "react-router-dom";


export const LoginForm: FC = () => {
    const form = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })

    const { formState: { errors }, handleSubmit } = form;
    const loginMethod = useLogin(LoginType.EMAIL);
    useAuthRedirect();

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        try {
            if (!loginMethod) return;

            await loginMethod(data.email, data.password);

        } catch (error) {
            handleErrorMessage(error);
        }
    };

    return (
        <FormProvider {...form}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                />
                {errors.email
                    &&
                    <p className="text-red-500 text-sm">
                        {errors.email.message as string}
                    </p>}

                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                />
                {errors.password
                    &&
                    <p className="text-red-500 text-sm">
                        {errors.password.message as string}
                    </p>}

                <Button text={"Sign in"} type="submit" />
                <p>Don't have an account? <Link className="text-blue-500 " to={"/register"} >Sign up</Link> </p>
            </Form>
        </FormProvider>
    );
};
