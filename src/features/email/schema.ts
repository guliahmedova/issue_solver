import { z, ZodType } from "zod";
import EmailType from "./modules/user";

const EmailValidationSchema: ZodType<EmailType> = z.object({
    email: z.string().email(),
});

export default EmailValidationSchema;