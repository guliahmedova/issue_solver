"use client";
import { Button, Input } from "@/features/common";
import { Box, Typography } from "@mui/material";
import { Field, Formik } from "formik";
import styles from "./index.module.scss";

export default function LoginForm() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Box>
          <Typography variant="h6" color="initial" fontSize={28} fontWeight={600}>
            Daxil ol
          </Typography>
          <Typography
            variant="body2"
            color="initial"
            fontSize={15}
            fontWeight={400}
            sx={{ color: "#9D9D9D" }}
            noWrap
          >
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
                  width="100%"
                  labelText="E-poçt"
                  autoFocus={true}
                  autoComplete="email"
                  component={Input}
                  placeholder="E-poçtunuzu daxil edin."
                //   errorText={touched.email && errors.email ? errors.email : undefined}
                //   value={values.email}
                //   onChange={handleChange}
                //   onBlur={handleBlur}
                />
                <Field
                  name="email"
                  width="100%"
                  labelText="E-poçt"
                  autoFocus={true}
                  autoComplete="email"
                  component={Input}
                  placeholder="E-poçtunuzu daxil edin."
                //   errorText={touched.email && errors.email ? errors.email : undefined}
                //   value={values.email}
                //   onChange={handleChange}
                //   onBlur={handleBlur}
                />
                <Button variant="primary">Daxil ol</Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className={styles.register}>
        <Typography color="initial">Hesabınız yoxdur?</Typography>
        <Typography color="initial">Qeydiyyatdan keçin</Typography>
      </div>
    </div>
  );
}
