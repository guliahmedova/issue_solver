"use client";
import { Input } from "@/features/common";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { z, ZodError } from "zod";
import style from "./changepassword.module.scss";
import ValidationSchema from "./schema";
import { useState } from "react";

type FormValues = z.infer<typeof ValidationSchema>;

const ChangePassword = () => {
  const { trigger: changePasswordTrigger, data: changePasswordResponse } = useRequestMutation(API.reset_password, { method: 'POST' });
  const [error, setError] = useState<null | string>(null);

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
    const token = sessionStorage.getItem('otp_token');
    const data = {
      password: values?.password,
      confirmPassword: values?.confirmPassword
    };
    try {
      await changePasswordTrigger({ body: data, params: `?token=${token}` });
      actions.setSubmitting(false);
      console.log("changePasswordResponse: ", changePasswordResponse);
      setError(null);
    } catch (error: any) {
      console.error("ERROR IN CHANGE PASSWORD: ", error);
      actions.setSubmitting(false);
      setError(error?.response?.data?.message);
    } finally {
      sessionStorage.removeItem('otp_token');
      sessionStorage.removeItem('user_email');
    }
  };

  return (
    <Box className={style.changepassword_container} component="div">
      <Box component="div" className={style.changepassword_content}>
        <Box component="div">
          <Typography className={style.form_title}>Yeni şifrə təyin edin</Typography>
          <Typography className={style.sub_title}>
            Daxil olmaq üçün yeni şifrə təyin edin.
          </Typography>
          <Divider className={style.divider} component="hr" />
        </Box>

        <Box marginTop="40px">
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
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
                  errorText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
  );
};

export default ChangePassword;