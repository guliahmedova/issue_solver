"use client";
import { Button, Input } from "@/features/common";
import { Box, Typography } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import Link from "next/link";
import { useState } from "react";
import { ZodError, z } from "zod";
import ValidationSchema from "./schema";

type FormValues = z.infer<typeof ValidationSchema>;

export default function LoginForm() {
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
          initialValues={{ name: "jared" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <div className={styles.fieldContainer}>
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
                <Button variant="primary">Daxil ol</Button>
              </div>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
