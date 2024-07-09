"use client";
import { Input } from "@/features/common";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { Box, Button, CircularProgress, Divider, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import style from "./changepassword.module.scss";
import ValidationSchema from "./schema";

type FormValues = z.infer<typeof ValidationSchema>;

const ChangePassword = () => {
  const { trigger: changePasswordTrigger } = useRequestMutation(API.reset_password, { method: 'POST' });
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const otpToken = sessionStorage.getItem('otp_token');
    actions.setSubmitting(false);

    const data = {
      password: values?.password,
      confirmPassword: values?.confirmPassword
    };

    try {
      setLoader(true);
      const response = await changePasswordTrigger({
        body: data,
        params: { token: `${otpToken}` }
      });
      router.push('/login');
      sessionStorage.clear();
    } catch (error: any) {
      setError(error?.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Box className={style.changepassword_container} component="div">
        <Box component="div" className={`${style.changepassword_content} lg:w-[68%] w-11/12 mx-auto`} >
          <Box component="div">
            <Typography className={`${style.form_title} select-none`}>Yeni şifrə təyin edin</Typography>
            <Typography className={`${style.sub_title} select-none`}>
              Daxil olmaq üçün yeni şifrə təyin edin
            </Typography>
            <Divider className={style.divider} component="hr" />
          </Box>

          <Box marginTop="40px">
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
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
              }: FormikProps<FormValues>) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    name="password"
                    labelText="Şifrə"
                    type="password"
                    component={Input}
                    placeholder="Şifrənizi təyin edin"
                    autoComplete="password"
                    errorText={touched.password && errors.password ? errors.password : undefined}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Field
                    name="confirmPassword"
                    labelText="Şifrə təsdiqi"
                    type="password"
                    component={Input}
                    placeholder="Şifrənizi təsdiq edin"
                    autoComplete="confirmPassword"
                    errorText={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : undefined
                    }
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {error && <Typography color="red">{error}</Typography>}
                  <Button
                    type="submit"
                    fullWidth
                    variant="primary"
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

      <div className={`${loader ? 'fixed' : 'hidden'} top-0 bottom-0 lg:left-auto left-0 right-0 flex lg:w-[50%] flex-col items-center justify-center bg-black/30 z-40`}>
        <CircularProgress size="4rem" />
      </div>
    </>
  );
};

export default ChangePassword;