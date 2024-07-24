import { z, ZodType } from "zod";

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.* ).{8,}$/;

const requiredErrorMsg = "Şifrə mütləq daxil edilməlidir";
const validationErrorMsg = "Şifrədə ən azı bir böyük və kiçik latın hərfi, rəqəm və xüsusi simvol istifadə olunmalıdır";
const minLengthErrorMsg = "Şifrə ən azı 8 simvoldan ibarət olmalıdır";
const matchErrorMsg = "Yeni şifrə cari şifrə ilə eyni olmamalıdır";

interface Password {
    password: string;
    newPassword: string;
    confirmPassword: string;
};

const ValidationSchema: ZodType<Password> = z.object({
    password: z.string({
        message: requiredErrorMsg
    }).min(8, {
        message: minLengthErrorMsg
    }).regex(passwordValidation, {
        message: validationErrorMsg
    }),
    newPassword: z.string({
        message: requiredErrorMsg
    }).min(8, {
        message: minLengthErrorMsg
    }).regex(passwordValidation, {
        message: validationErrorMsg
    }),
    confirmPassword: z.string({
        message: requiredErrorMsg
    }).min(8, {
        message: minLengthErrorMsg
    }).regex(passwordValidation, {
        message: validationErrorMsg
    }),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: matchErrorMsg,
    path: ['confirmPassword']
});

export default ValidationSchema;
