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
        required_error: requiredErrorMsg
    }).min(8, minLengthErrorMsg)
        .regex(passwordValidation, { message: validationErrorMsg }),

    newPassword: z.string({
        required_error: requiredErrorMsg
    }).min(8, minLengthErrorMsg)
        .regex(passwordValidation, { message: validationErrorMsg }),
        
    confirmPassword: z.string({
        required_error: requiredErrorMsg
    }).min(8, minLengthErrorMsg)
        .regex(passwordValidation, { message: validationErrorMsg })
}).superRefine(({ password, newPassword }, ctx) => {
    if (password === newPassword) {
        ctx.addIssue({
            code: 'custom',
            message: matchErrorMsg,
            path: ['newPassword']
        })
    };
});

export default ValidationSchema;