import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Form } from "../Form";
import { Button } from "../Button";
import { FormInput } from "../FormInput";

type LoginFormProps = {
    onSubmit: () => void;
    isPending?: boolean;
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, isPending }) => {
    const { formState: { errors } } = useFormContext();

    return (
        <Form onSubmit={onSubmit}>
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

            <Button text={isPending ? "Loading..." : "Sign in"} type="submit" />
        </Form>
    );
};
