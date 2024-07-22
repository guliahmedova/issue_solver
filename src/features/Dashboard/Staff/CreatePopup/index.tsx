import { closeBtn } from "@/assets/imgs";
import { Button, Input, Loader } from "@/features/common";
import API from "@/http/api";
import { useRequest, useRequestMutation } from "@/http/request";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Divider, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ValidationSchema from "./schema";

interface ICreatePopup {
    openPopup: boolean;
    setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
    refreshData: () => Promise<void>;
};

interface Organization {
    name: string;
    active: boolean;
};

type FormValues = z.infer<typeof ValidationSchema>;

const CreatePopup = ({ openPopup, setOpenPopup, refreshData }: ICreatePopup) => {
    const { trigger: updatePasswordTrigger } = useRequestMutation(API.staff_create, { method: 'POST' });
    const { data: organizations } = useRequest(API.organizations_get, { method: 'GET' });
    const modelRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
        if (modelRef?.current && !modelRef?.current?.contains(e.target as Node)) {
            setOpenPopup(false);
        };
    };

    const handleSubmit = async (values: FormValues, actions: FormikHelpers<any>) => {
        try {
            setLoader(true);
            setError(null);
            const data = {
                fullName: values.title,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
            };
            await updatePasswordTrigger({ body: data, params: { organization: values.organization, role: "STAFF" } });
            actions.setSubmitting(false);
            setOpenPopup(false);
            await refreshData();
        } catch (error: any) {
            setError(error?.response?.data?.message);
        } finally {
            setLoader(false);
            actions.resetForm({
                values: {
                    title: "",
                    email: "",
                    organization: "",
                    password: "",
                    confirmPassword: ""
                }
            })
        }
    };

    return (
        <>
            <div className={`${openPopup ? 'fixed' : 'hidden'} top-0 bottom-0 left-0 z-40 right-0 bg-black/20 flex flex-col items-center justify-center`}
                onClick={handleOutsideClick}
            >
                <div className="bg-white rounded-lg shadow py-8 px-6 xl:w-4/12 lg:w-6/12 md:w-7/12 sm:w-8/12 w-9/12 h-[650px] relative"
                    ref={modelRef}
                >
                    <div className="absolute -top-4 -right-4 cursor-pointer">
                        <button onClick={() => setOpenPopup(false)}>
                            <Image alt="" src={closeBtn} />
                        </button>
                    </div>
                    <div className="w-full h-full overflow-auto">
                        <Box className="select-none">
                            <Typography color="initial" fontSize={28} fontWeight={600} className="text-[#2981FF]">
                                Yeni Staff
                            </Typography>
                            <Typography fontSize={15} fontWeight={400} sx={{ color: "#9D9D9D" }} noWrap>
                                Zəhmət olmasa məlumatlarınızı qeyd edin
                            </Typography>
                        </Box>

                        <Divider
                            color="#2981FF"
                            sx={{ height: "0.5px", width: "100%", border: "0.5px", opacity: "20%", marginBlock: "1rem" }}
                        />

                        <Formik
                            initialValues={{
                                title: "",
                                email: "",
                                organization: "",
                                password: "",
                                confirmPassword: ""
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
                            }: FormikProps<any>) => (
                                <Form onSubmit={handleSubmit}>
                                    <Box display="flex" flexDirection="column">
                                        <Field
                                            name="title"
                                            labelText="Staffın Adı"
                                            type="text"
                                            component={Input}
                                            placeholder="Ad, Soyad"
                                            autoComplete="title"
                                            errorText={touched.title && errors.title ? errors.title : undefined}
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Field
                                            name="email"
                                            labelText="E-poçt"
                                            type="text"
                                            component={Input}
                                            placeholder="E-poçtunuzu daxil edin"
                                            autoComplete="email"
                                            errorText={touched.email && errors.email ? errors.email : undefined}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {/*-------------------------------------------------- */}
                                        <Box className="w-full mb-6">
                                            <InputLabel variant="standard">Aid olduğu qurum</InputLabel>
                                            <Select
                                                className="w-full"
                                                value={values.organization}
                                                MenuProps={{
                                                    disablePortal: true,
                                                    onClick: e => {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onChange={(e) => handleChange(e)}
                                                displayEmpty
                                                name="organization"
                                                IconComponent={({ className }) => (
                                                    <KeyboardArrowDownIcon className={className} style={{ color: '#4D96FF' }} />
                                                )}
                                            >
                                                <MenuItem className="text-[#000000] bg-white hidden" value="" disabled>
                                                    Qurum
                                                </MenuItem>
                                                {organizations?.data?.items?.map((organization: Organization, index: number) => (
                                                    <MenuItem className="text-[#000000] bg-white" key={index} value={organization.name}>{organization.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </Box>
                                        {/*-------------------------------------------------- */}

                                        <Field
                                            name="password"
                                            labelText="Şifrə"
                                            type="password"
                                            component={Input}
                                            placeholder="Şifrənizi qeyd edin"
                                            autoComplete="password"
                                            errorText={touched.password && errors.password ? errors.password : undefined}
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Field
                                            name="confirmPassword"
                                            labelText="Şifrə Təsdiqi"
                                            type="password"
                                            component={Input}
                                            placeholder="Şifrənizi təsdiq edin"
                                            autoComplete="confirmPassword"
                                            errorText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {error && <Typography color="red">{error}</Typography>}
                                        <Button type="submit" variant="primary" disabled={!isValid || !dirty}>
                                            Əlavə et
                                        </Button>
                                    </Box>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            <Loader loader={loader} />
        </>
    )
};

export default CreatePopup;