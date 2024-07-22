"use client";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { Box, Divider, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Button, Input, Loader } from "../common";
import EmailValidationSchema from "./schema";

type FormValues = z.infer<typeof EmailValidationSchema>;

export default function ForgotPassword() {
  const { trigger: sendEmailTrigger } = useRequestMutation(API.forgot_password, { method: 'POST' });
  const router = useRouter();
  const [emailError, setEmailError] = useState<null | string>(null);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    try {
      setLoader(true);
      setEmailError(null);
      const email = values?.email;
      await sendEmailTrigger({ body: { email: email } });
      actions.setSubmitting(false);
      router.push('/confirm-otp');
      sessionStorage.setItem('user_email', email);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setEmailError(error?.response?.data?.message);
      }
      actions.setSubmitting(false);
    } finally {
      setLoader(false);
      actions.resetForm({
        values: {
          email: ""
        }
      });
    }
  };

  return (
    <>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Box paddingBottom="20px" textAlign="left" className="lg:w-[68%] w-11/12 mx-auto">
          <Typography color="initial" fontSize={28} fontWeight={600} className="select-none">
            E-poçtunuzu daxil edin
          </Typography>
          <Typography fontSize={15} fontWeight={400} sx={{ color: "#9D9D9D" }} noWrap className="select-none">
            E-poçt hesabınıza təsdiq kod göndəriləcək
          </Typography>
        </Box>
        <Divider
          component="hr"
          color="#2981FF"
          style={{
            borderColor: "#2981ff",
            opacity: "0.4",
            width: "68%",
            marginBottom: "30px",
          }}
        />

        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={toFormikValidationSchema(EmailValidationSchema)}
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
            <Box display="flex" justifyContent="center" alignItems="center" className="lg:w-[68%] w-11/12 mx-auto">
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
                  placeholder="E-poçtunuzu daxil edin"
                  errorText={touched.email && errors.email ? errors.email : undefined}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {emailError && <Typography color="red" textAlign="left" width="60%">{emailError}</Typography>}

                <Button variant="primary" type="submit" disabled={!isValid || !dirty}>
                  Təsdiq kodu göndər
                </Button>
              </Form>
            </Box>
          )}
        </Formik>
      </Box>

      <Loader loader={loader} />
    </>
  );
};