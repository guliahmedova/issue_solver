import { closeBtn } from "@/assets/imgs";
import { Button, Input } from "@/features/common";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";

interface ICreatePopup {
    openPopup: boolean;
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
};

const CreatePopup = ({ openPopup, setOpenPopup }: ICreatePopup) => {
    const { trigger: updatePasswordTrigger } = useRequestMutation(API.user_update_password, { method: 'PUT' });
    const modelRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
        if (modelRef?.current && !modelRef?.current?.contains(e.target as Node)) {
            setOpenPopup(false);
        };
    };

    const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
        try {
            setLoader(true);
            setError(null);
            const data = {
                currentPassword: values.password,
                password: values.newPassword,
                confirmPassword: values.confirmPassword
            };
            await updatePasswordTrigger({ body: data });
            actions.setSubmitting(false);
            setOpenPopup(false);
        } catch (error: any) {
            setError(error?.response?.data?.message);
        } finally {
            setLoader(false);
            actions.resetForm({
                values: {
                    password: "",
                    newPassword: "",
                    confirmPassword: ""
                }
            })
        }
    };

    return (
        <>
            <div className={`${openPopup ? 'fixed' : 'hidden'} top-0 bottom-0 left-0 z-40 right-0 bg-black/20 flex flex-col items-center justify-center`}
                onClick={handleOutsideClick}
            >
                <div className="bg-white rounded-lg shadow py-8 px-6 xl:w-4/12 lg:w-6/12 md:w-7/12 sm:w-8/12 w-9/12 h-[650px] relative"
                    ref={modelRef}
                >
                    <div className="absolute -top-4 -right-4 cursor-pointer">
                        <button onClick={() => setOpenPopup(false)}>
                            <Image alt="" src={closeBtn} />
                        </button>
                    </div>
                    <div className="w-full h-full overflow-auto">
                        <Box className="select-none">
                            <Typography color="initial" fontSize={28} fontWeight={600} className="text-[#2981FF]">
                                Yeni Staff
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
                                password: "",
                                newPassword: "",
                                confirmPassword: ""
                            }}
                            onSubmit={handleSubmit}
                            // validationSchema={toFormikValidationSchema(an)}
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
                                            name="confirmPassword"
                                            labelText="Staffın Adı"
                                            type="text"
                                            component={Input}
                                            placeholder="Ad, Soyad"
                                            autoComplete="confirmPassword"
                                            errorText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Field
                                            name="confirmPassword"
                                            labelText="E-poçt"
                                            type="text"
                                            component={Input}
                                            placeholder="E-poçtunuzu daxil edin"
                                            autoComplete="confirmPassword"
                                            errorText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Field
                                            name="confirmPassword"
                                            labelText="Aid olduğu qurum"
                                            type="text"
                                            component={Input}
                                            placeholder="Qurum"
                                            autoComplete="confirmPassword"
                                            errorText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Field
                                            name="confirmPassword"
                                            labelText="Şifrə"
                                            type="password"
                                            component={Input}
                                            placeholder="Şifrənizi qeyd edin"
                                            autoComplete="confirmPassword"
                                            errorText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Field
                                            name="confirmPassword"
                                            labelText="Şifrə Təsdiqi"
                                            type="password"
                                            component={Input}
                                            placeholder="Şifrənizi təsdiq edin"
                                            autoComplete="confirmPassword"
                                            errorText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {error && <Typography color="red">{error}</Typography>}
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