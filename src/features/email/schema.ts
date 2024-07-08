import { z, ZodType } from "zod";
import EmailType from "./modules/user";

const EmailValidationSchema: ZodType<EmailType> = z.object({
    email: z.string({
        required_error: "E-poçt mütləq daxil edilməlidir."
    })
        .email({ message: "E-poçt yanlışdır." })
});

export default EmailValidationSchema;