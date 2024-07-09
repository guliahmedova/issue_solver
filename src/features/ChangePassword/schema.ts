import { z, ZodType } from "zod";
import Password from "./modules/password";

const passwordValidation = new RegExp(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
);

const ValidationSchema: ZodType<Password> = z.object({
    password: z.string({
        required_error: "Şifrə mütləq daxil edilməlidir"
    }).min(8, "Şifrə ən azı 8 simvoldan ibarət olmalıdır")
        .regex(passwordValidation, { message: 'Şifrədə ən azı bir böyük və kiçik latın hərfi, rəqəm və xüsusi simvol istifadə olunmalıdır' }),
    confirmPassword: z.string({
        required_error: "Şifrə mütləq daxil edilməlidir"
    }).min(8, "Şifrə ən azı 8 simvoldan ibarət olmalıdır")
        .regex(passwordValidation, { message: 'Şifrədə ən azı bir böyük və kiçik latın hərfi, rəqəm və xüsusi simvol istifadə olunmalıdır' }),
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