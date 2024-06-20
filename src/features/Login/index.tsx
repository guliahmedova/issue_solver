"use client";
import { Box, Typography } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import Link from "next/link";
import { useState } from "react";
import { ZodError, z } from "zod";
import Button from "../common/Button/Button";
import Input from "../common/Input";
import ValidationSchema from "./schema";

type FormValues = z.infer<typeof ValidationSchema>;

export default function LoginForm() {
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

  return (
    <Box component="div" height="100%" display="flex" justifyContent="center" alignItems="flex-end">
      <Box width="83%" display="flex" flexDirection="column" gap="20px">
        <Box>
          <Typography color="initial" fontSize={28} fontWeight={600}>
            Daxil ol
          </Typography>
          <Typography fontSize={15} fontWeight={400} sx={{ color: "#9D9D9D" }} noWrap>
            Zəhmət olmasa, giriş üçün məlumatlarınızı daxil edin.
          </Typography>
        </Box>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={values => {
            console.log(values);
          }}
          validate={validateForm}
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
              <Box display="flex" flexDirection="column" gap="20px">
                <Field
                  name="email"
                  labelText="E-poçt"
                  type="text"
                  autoFocus={true}
                  autoComplete="email"
                  component={Input}
                  placeholder="E-poçtunuzu daxil edin."
                  errorText={touched.email && errors.email ? errors.email : undefined}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  name="password"
                  labelText="Şifrə"
                  type="password"
                  component={Input}
                  placeholder="Şifrənizi daxil edin."
                  autoComplete="password"
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                  errorText={touched.password && errors.password ? errors.password : undefined}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Box textAlign="right" color="#4D96FF">
                  <Link href="/forgot-password">Şifrənizi unutmusuz?</Link>
                </Box>
                <Button type="submit" variant="primary" disabled={!isValid || !dirty}>
                  Daxil ol
                </Button>
              </Box>

              <Box
                textAlign="right"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                  marginBlock: "40px",
                }}
              >
                <Typography color="#9D9D9D">Hesabınız yoxdur?</Typography>
                <Link
                  href="/register"
                  style={{
                    textDecoration: "none",
                    color: "#2981FF",
                  }}
                >
                  Qeydiyyatdan keçin
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
