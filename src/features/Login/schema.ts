import { z, ZodType } from "zod";
import User from "./modules/user";

const passwordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

const ValidationSchema: ZodType<User> = z.object({
    email: z.string({
        required_error: "E-poçt mütləq daxil edilməlidir."
    })
        .email({ message: "E-poçt yanlışdır." }),
    password: z.string({ required_error: "Şifrə mütləq daxil edilməlidir." })
        .min(8, { message: "Şifrə ən azı 8 simvoldan ibarət olmalıdır." })
        .regex(passwordValidation, { message: 'Şifrədə ən azı bir böyük və kiçik latın hərfi, rəqəm və xüsusi simvol olmalıdır.' }),
});

export default ValidationSchema;