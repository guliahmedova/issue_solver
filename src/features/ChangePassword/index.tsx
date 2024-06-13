"use client";
import { Input } from '@/features/common';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useState } from 'react';
import { z, ZodError } from 'zod';
import style from './changepassword.module.scss';
import ValidationSchema from './schema';

type FormValues = z.infer<typeof ValidationSchema>;

const ChangePassword = () => {
    // const { trigger: loginTrigger, isMutating: isCreating, error } = useRequestMutation(API.login, { method: 'POST' });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validateForm = (values: FormValues) => {
        try {
            ValidationSchema.parse(values);
        } catch (error) {
            if (error instanceof ZodError) {
                return error.formErrors.fieldErrors;
            }
        }
    };

    const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        // try {
        //     const data = {
        //         password: values?.password,
        //         email: values?.confirmPassword
        //     };

        //     await loginTrigger({ body: data });
        //     actions.setSubmitting(false);
        // } catch (error) {
        //     console.error("ERROR IN LOGIN PAGE/SUBMIT FORM: ", error);
        //     actions.setSubmitting(false);
        // }
    };

    return (
        <Box className={style.changepassword_container} component="div">
            <Box component="div" className={style.changepassword_content}>
                <Box component="div">
                    <Typography className={style.form_title}>Yeni şifrə təyin edin</Typography>
                    <Typography className={style.sub_title}>Daxil olmaq üçün yeni şifrə təyin edin.</Typography>
                    <Divider className={style.divider} component="hr" />
                </Box>

                <Box marginTop="40px">
                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: ''
                        }}
                        validate={validateForm}
                        onSubmit={handleSubmit}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                            touched,
                            isValid,
                            dirty
                        }: FormikProps<FormValues>) => (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name="password"
                                    labelText="Şifrə"
                                    type="password"
                                    component={Input}
                                    placeholder="Şifrənizi təyin edin"
                                    autoComplete="password"
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    errorText={touched.password && errors.password ? errors.password : undefined}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Field
                                    name="confirmPassword"
                                    labelText="Şifrənin təsdiqi"
                                    type="password"
                                    component={Input}
                                    placeholder="Şifrənizi təsdiq edin"
                                    autoComplete="confirmPassword"
                                    showPassword={showPassword}
                                    handleClickShowPassword={handleClickShowPassword}
                                    handleMouseDownPassword={handleMouseDownPassword}
                                    errorText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 2, textTransform: "capitalize" }}
                                    disabled={!isValid || !dirty}
                                >
                                    Yenilə
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    );
}

export default ChangePassword;