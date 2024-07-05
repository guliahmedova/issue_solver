import { z, ZodType } from "zod";
import EmailType from "./modules/user";

const EmailValidationSchema: ZodType<EmailType> = z.object({
    email: z.string()
        .min(1, { message: "Uzunluq ən azı 1 olmalıdır." })
        .max(50, { message: "Uzunluq ən çox 50 olmalıdır." })
        .refine(value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value), {
            message: "E-poçt doğru formatda deyil.",
            path: ["email"], 
        }),
});

export default EmailValidationSchema;
