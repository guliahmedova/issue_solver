import { z, ZodType } from "zod";
import Password from "./modules/password";

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const ValidationSchema: ZodType<Password> = z.object({
    password: z.string().min(8, "Şifrə ən azı 8 simvoldan ibarət olmalıdır"),
    confirmPassword: z.string().regex(passwordValidation, { message: 'Your password is not valid', }),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: "Hər iki şifrə dəqiq eyni olmalıdır",
            path: ['confirmPassword']
        })
    };
});

export default ValidationSchema;

// Şifrədə ən azı bir böyük və kiçik latın hərfi, rəqəm və xüsusi simvol istifadə olunmalıdır.