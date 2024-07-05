import { z, ZodType } from "zod";
import User from "./modules/user";

const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

const ValidationSchema: ZodType<User> = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, { message: "Şifrə ən azı 8 simvoldan ibarət olmalıdır." })
        .regex(passwordValidation, { message: 'Şifrə yanlışdır.' }),
});

export default ValidationSchema;