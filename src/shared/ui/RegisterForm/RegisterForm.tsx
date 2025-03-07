import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Form } from "../Form";
import { Button } from "../Button";
import { FormInput } from "../FormInput";

type RegisterFormProps = {
    onSubmit: () => void;
    isPending?: boolean;
    error?: string;
};

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, isPending, error }) => {
    const { formState: { errors } } = useFormContext();

    return (
        <Form onSubmit={onSubmit}>
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
                text={isPending ? "Creating account..." : "Register"}
                type="submit"
            />

            {error && (
                <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 rounded-md">
                    {error}
                </div>
            )}
        </Form>
    );
};