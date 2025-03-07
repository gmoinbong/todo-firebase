import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const registerFormSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(40, { message: "Name must be at most 40 characters long" })
        .regex(/^[a-zA-Z]+$/, { message: "Name must contain only letters (a-z, A-Z)" }),

    email: z.string()
        .email({ message: "Invalid email address" })
        .max(40, { message: "Email must be at most 40 characters long" }),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must be at most 50 characters long" })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, { message: "Password must include at least 1 digit and 1 letter" }),

    confirmPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must be at most 50 characters long" })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, { message: "Password must include at least 1 digit and 1 letter" })
})
    .refine((values) => {
        return values.password === values.confirmPassword;
    },
        {
            message: "Passwords must match!",
            path: ["confirmPassword"]
        },

    )

export type RegisterFormValues = z.infer<typeof registerFormSchema>

export const useRegisterForm = () => {
    return useForm<RegisterFormValues>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
}


