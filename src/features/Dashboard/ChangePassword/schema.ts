import { z, ZodType } from "zod";
import Password from "./modules/password";

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.* ).{8,}$/;

const required_error_msg = "Şifrə mütləq daxil edilməlidir";
const validation_msg = 'Şifrədə ən azı bir böyük və kiçik latın hərfi, rəqəm və xüsusi simvol istifadə olunmalıdır';
const min_msg = "Şifrə ən azı 8 simvoldan ibarət olmalıdır";
const confirmPassword_msg = "Hər iki şifrə dəqiq eyni olmalıdır";
const match_msg = "Yeni şifrə cari şifrə ilə eyni olmamalıdır";

const ValidationSchema: ZodType<Password> = z.object({
    password: z.string({
        required_error: required_error_msg
    }).min(8, min_msg)
        .regex(passwordValidation, { message: validation_msg }),
    newPassword: z.string({
        required_error: required_error_msg
    }).min(8, min_msg)
        .regex(passwordValidation, { message: validation_msg }),
    confirmPassword: z.string({
        required_error: required_error_msg
    }).min(8, min_msg)
        .regex(passwordValidation, { message: validation_msg }),
}).refine(({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
        return {
            confirmPassword: confirmPassword_msg
        };
    }
    return true;
}, {
    message: match_msg,
    path: ['newPassword']
});

export default ValidationSchema;
