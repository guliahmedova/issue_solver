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
    newPassword: z.string({
        required_error: "Şifrə mütləq daxil edilməlidir"
    }).min(8, "Şifrə ən azı 8 simvoldan ibarət olmalıdır")
        .regex(passwordValidation, { message: 'Şifrədə ən azı bir böyük və kiçik latın hərfi, rəqəm və xüsusi simvol istifadə olunmalıdır' }),
    confirmPassword: z.string({
        required_error: "Şifrə mütləq daxil edilməlidir"
    }).min(8, "Şifrə ən azı 8 simvoldan ibarət olmalıdır")
        .regex(passwordValidation, { message: 'Şifrədə ən azı bir böyük və kiçik latın hərfi, rəqəm və xüsusi simvol istifadə olunmalıdır' }),
}).superRefine(({ newPassword, confirmPassword, password }, ctx) => {
    if (password === newPassword) {
        ctx.addIssue({
            code: 'custom',
            message: "Cari şifrə yeni şifrə ilə eyni olmamalıdır",
            path: ['password']
        })
    }
    if (newPassword !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: "Hər iki şifrə dəqiq eyni olmalıdır",
            path: ['confirmPassword']
        })
    }
});

export default ValidationSchema;