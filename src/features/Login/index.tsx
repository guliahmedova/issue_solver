"use client";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { useAuthStore } from "@/state/useAuthStore";
import { Box, Divider, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "../common/Button/Button";
import Input from "../common/Input";
import ValidationSchema from "./schema";

type FormValues = z.infer<typeof ValidationSchema>;

export default function LoginForm() {
  const { trigger: LoginTrigger } = useRequestMutation(API.login, { method: "POST" });
  const setAuth = useAuthStore(state => state.setAuth);
  const [loginError, setLoginError] = useState(null);
  const [blockPopup, setBlockPopup] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    actions.setSubmitting(false);
    try {
      const loginData = await LoginTrigger({ body: data });
      router.push('/dashboard');
      setAuth({ token: loginData?.data?.accessToken, refreshToken: loginData?.data?.refreshToken });
      setLoginError(null);
      setBlockPopup(false);
    } catch (error: any) {
      setLoginError(error?.response?.data?.message);
      setBlockPopup(true);
    }
  };

  return (
    <>
      <div className={`${blockPopup ? 'fixed' : 'hidden'} top-0 bottom-0 lg:right-0 lg:left-auto right-0 left-0 w-full bg-black/30 lg:w-6/12 h-full z-40 flex flex-col justify-center items-center`}>
        <Box className='bg-white rounded-md shadow border p-4'>
          <Box className=''>
            <Typography className="text-lg select-none">Daha sonra yenidən cəhd edin</Typography>
            <Button variant="secondary" onClick={() => router.push("/login")}>Oldu</Button>
          </Box>
        </Box>
      </div>

      <Box component="div" height="100%" display="flex" justifyContent="center" alignItems="center">
        <Box className="lg:w-[68%] w-11/12 mx-auto" display="flex" flexDirection="column" gap="20px">
          <Box>
            <Typography color="initial" fontSize={28} fontWeight={600} className="select-none">
              Daxil ol
            </Typography>
            <Typography fontSize={15} fontWeight={400} sx={{ color: "#9D9D9D" }} noWrap className="select-none">
              Zəhmət olmasa, giriş üçün məlumatlarınızı daxil edin
            </Typography>
          </Box>
          <Divider
            color="#2981FF"
            sx={{ height: "0.5px", width: "100%", border: "0.5px", opacity: "40%" }}
          />
          <Formik
            initialValues={{
              email: "",
              password: "",
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
                <Box display="flex" flexDirection="column">
                  <Field
                    name="email"
                    labelText="E-poçt"
                    type="text"
                    autoComplete="email"
                    component={Input}
                    placeholder="E-poçtunuzu daxil edin"
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
                    placeholder="Şifrənizi daxil edin"
                    autoComplete="password"
                    errorText={touched.password && errors.password ? errors.password : undefined}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {loginError && <Typography color="red">{loginError}</Typography>}
                  <Box textAlign="right" color="#4D96FF" marginBottom="40px">
                    <Link href="/forgot-password">Şifrənizi unutmusunuz?</Link>
                  </Box>
                  <Button type="submit" variant="primary" disabled={!isValid || !dirty}>
                    Daxil ol
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};