import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string()
        .trim()
        .email({ message: "Invalid email address" })
        .max(40, { message: "Email must be at most 40 characters long" }),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must be at most 50 characters long" })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, { message: "Password must include at least 1 digit and 1 letter" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const useLoginForm = () => {
    return useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });
};
