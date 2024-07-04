import { z, ZodType } from "zod";
import Password from "./modules/password";

const ValidationSchema: ZodType<Password> = z.object({
    password: z.string().min(8, "Must be more than 8 characters!"),
    newPassword: z.string().min(8, "Must be more than 8 characters!"),
    confirmPassword: z.string().min(8, "Must be more than 8 characters!")
}).superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: "Hər iki şifrə dəqiq eyni olmalıdır",
            path: ['confirmPassword']
        })
    };
});

export default ValidationSchema;

