import { closeBtn } from "@/assets/imgs";
import { Button, Input } from "@/features/common";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ValidationSchema from "./schema";
import { z } from "zod";

interface ICreatePopup {
    openPopup: boolean;
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
    refreshData: () => Promise<void>;
};

type FormValues = z.infer<typeof ValidationSchema>;

const CreatePopup = ({ openPopup, setOpenPopup, refreshData }: ICreatePopup) => {
    const { trigger: createOrganizationTrigger } = useRequestMutation(API.organization_create, { method: 'POST' });
    const modelRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
        if (modelRef?.current && !modelRef?.current?.contains(e.target as Node)) {
            setOpenPopup(false);
        };
    };

    const handleSubmit = async (values: FormValues, actions: FormikHelpers<any>) => {
        try {
            setLoader(true);
            setError(null);
            await createOrganizationTrigger({
                body: {
                    name: values.name
                }
            });
            actions.setSubmitting(false);
            setOpenPopup(false);
            await refreshData();
        } catch (error: any) {
            setError(error?.response?.data?.message);
        } finally {
            setLoader(false);
            actions.resetForm({
                values: {
                    name: ""
                }
            });
        }
    };

    return (
        <>
            <div className={`${openPopup ? 'fixed' : 'hidden'} top-0 bottom-0 left-0 z-40 right-0 bg-black/20 flex flex-col items-center justify-center`}
                onClick={handleOutsideClick}
            >
                <div className="bg-white rounded-lg shadow py-8 px-6 lg:w-4/12 md:w-6/12 sm:w-7/12 relative"
                    ref={modelRef}
                >
                    <div className="absolute -top-4 -right-4 cursor-pointer">
                        <button onClick={() => setOpenPopup(false)}>
                            <Image alt="" src={closeBtn} />
                        </button>
                    </div>
                    <div className="w-full">
                        <Box className="select-none">
                            <Typography color="initial" fontSize={28} fontWeight={600} className="text-[#2981FF]">
                                Yeni Qurum
                            </Typography>
                            <Typography fontSize={15} fontWeight={400} sx={{ color: "#9D9D9D" }} noWrap>
                                Zəhmət olmasa, aşağıda məlumatlarınızı qeyd edin
                            </Typography>
                        </Box>
                        <Divider
                            color="#2981FF"
                            sx={{ height: "0.5px", width: "100%", border: "0.5px", opacity: "20%", marginBlock: "1rem" }}
                        />

                        <Formik
                            initialValues={{
                                name: ""
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={toFormikValidationSchema(ValidationSchema)}
                            validateOnBlur={true}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                                touched,
                                isValid,
                                dirty,
                            }: FormikProps<any>) => (
                                <Form onSubmit={handleSubmit}>
                                    <Box display="flex" flexDirection="column">
                                        <Field
                                            name="name"
                                            labelText="Qurumun Adı"
                                            type="text"
                                            component={Input}
                                            placeholder="Qurmun adını əlavə edin"
                                            autoComplete="name"
                                            errorText={touched.name && errors.name ? errors.name : undefined}
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {error && <Typography color="red" className="mb-2">{error}</Typography>}
                                        <Button type="submit" variant="primary" disabled={!isValid || !dirty}>
                                            Əlavə et
                                        </Button>
                                    </Box>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            <div className={`${loader ? 'fixed' : 'hidden'} top-0 bottom-0 left-0 right-0 flex w-full flex-col items-center justify-center bg-black/10 z-40`}>
                <CircularProgress size="4rem" />
            </div>
        </>
    )
}

export default CreatePopup