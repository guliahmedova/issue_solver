"use client";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { Box, Divider, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ZodError, z } from "zod";
import { Button } from "../common";
import Input from "../common/Input";
import EmailValidationSchema from "./schema";
type FormValues = z.infer<typeof EmailValidationSchema>;

export default function ForgotPassword() {
  const { trigger: sendEmailTrigger } = useRequestMutation(API.forgot_password, { method: 'POST' });
  const router = useRouter();
  const [emailError, setEmailError] = useState<null | string>(null);

  const validateForm = (values: FormValues) => {
    try {
      EmailValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      const email = values?.email;
      await sendEmailTrigger({ body: { email: email } });
      actions.setSubmitting(false);
      router.push('/confirm-otp');
      sessionStorage.setItem('user_email', email);
      setEmailError(null);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setEmailError(error?.response?.data?.message);
        console.log("error in email: ", error);
      }
      actions.setSubmitting(false);
    }
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box paddingBottom="20px" textAlign="left" width="83%">
        <Typography color="initial" fontSize={28} fontWeight={600}>
          E-poçtunuzu daxil edin
        </Typography>
        <Typography fontSize={15} fontWeight={400} sx={{ color: "#9D9D9D" }} noWrap>
          E-poçt hesabınıza təsdiq kod göndəriləcək.
        </Typography>
      </Box>
      <Divider
        component="hr"
        color="#2981FF"
        style={{
          borderColor: "#2981ff",
          opacity: "0.4",
          width: "83%",
          marginBottom: "30px",
        }}
      />
      <Formik
        initialValues={{
          email: "",
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
          <Box display="flex" justifyContent="center" alignItems="center" width="83%">
            <Form
              onSubmit={handleSubmit}
              style={{ width: "100%", display: "flex", flexDirection: "column", gap: "60px" }}
            >
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
              <Button variant="primary" type="submit" disabled={!isValid || !dirty}>
                Təsdiq kodu göndər
              </Button>
            </Form>
          </Box>
        )}
      </Formik>

      {emailError && <Typography color="red">{emailError}</Typography>}

      {/* <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        marginTop="80px"
        width="83%"
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
      </Box> */}
    </Box>
  );
};