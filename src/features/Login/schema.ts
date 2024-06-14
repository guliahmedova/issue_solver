import { z, ZodType } from "zod";
import User from "./modules/user";

const ValidationSchema: ZodType<User> = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Must be more than 8 characters!"),
});

export default ValidationSchema;