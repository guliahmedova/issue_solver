import { z, ZodType } from "zod";
import Password from "./modules/Password";

const ValidationSchema: ZodType<Password> = z.object({
    password: z.string().min(8, "Must be more than 8 characters!"),
    newPassword: z.string().min(8, "Must be more than 8 characters!"),
    confirmPassword: z.string().min(8, "Must be more than 8 characters!")
});

export default ValidationSchema;