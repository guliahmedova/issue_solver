import { z, ZodType } from "zod";
import Password from "./modules/password";

const ValidationSchema: ZodType<Password> = z.object({
    password: z.string().min(8, "Must be more than 8 characters!"),
    confirmPassword: z.string().min(8, "Must be more than 8 characters!"),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: "The passwords do not match!",
            path: ['confirmPassword']
        })
    };
});

export default ValidationSchema;