import { z, ZodType } from "zod";
import EmailType from "./modules/user";

const EmailValidationSchema: ZodType<EmailType> = z.object({
    email: z.string()
        .min(1, { message: "E-poçt ən azı 10 simvoldan ibarət olmalıdır." })
        .refine(value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value), {
            message: "E-poçt yanlışdır.",
            path: ["email"], 
        }),
});

export default EmailValidationSchema;