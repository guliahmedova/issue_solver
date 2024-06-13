"use client";
import { Field, Form, Formik, FormikProps } from "formik";
import Input from "../common/Input";
import { Button } from "../common";
import { Box, Typography } from "@mui/material";
import { ZodError, z } from "zod";
import ValidationSchema from "../Login/schema";
type FormValues = z.infer<typeof ValidationSchema>;
export default function EmailDetermine() {
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
    <Box width="100%" height="100%" display="flex" justifyContent="center" flexDirection="column">
      <Box paddingBottom="28px">
        <Typography color="initial" fontSize={28} fontWeight={600}>
          Daxil ol
        </Typography>
        <Typography fontSize={15} fontWeight={400} sx={{ color: "#9D9D9D" }} noWrap>
          Zəhmət olmasa, giriş üçün məlumatlarınızı daxil edin.
        </Typography>
        <hr />
      </Box>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validateForm}
        onSubmit={values => {
          console.log(values);
        }}
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
              style={{ width: "100%", display: "flex", flexDirection: "column", gap: "100px" }}
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
              <Button variant="primary" type="submit" disabled={!isValid && !dirty}>
                Təsdiq kodu göndər
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
