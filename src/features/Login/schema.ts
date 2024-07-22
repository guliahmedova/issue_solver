import { z } from "zod";

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.* ).{8,}$/;

const ValidationSchema = z.object({
    email: z.string({
        required_error: "E-poçt mütləq daxil edilməlidir"
    })
        .email({ message: "E-poçt formatı yanlışdır" }),
    password: z.string({
        required_error: "Şifrə mütləq daxil edilməlidir"
    })
        .min(8, { message: "Şifrə ən azı 8 simvoldan ibarət olmalıdır" })
        .regex(passwordValidation, { message: 'Şifrədə ən azı bir böyük, kiçik hərf, rəqəm və xüsusi simvol istifadə olunmalıdır' }),
});

export default ValidationSchema;
