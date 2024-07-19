import { z, ZodType } from "zod";

interface Organization {
    name: string
};

const min_msg = "Qurum adı ən azı 1 simvoldan ibarət olmalıdır";

const ValidationSchema: ZodType<Organization> = z.object({
    name: z.string({
        required_error: "Qurum adı mütləq daxil edilməlidir"
    }).min(1, min_msg)
});

export default ValidationSchema;