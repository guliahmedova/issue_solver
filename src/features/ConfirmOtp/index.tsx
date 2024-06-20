"use client";
import { Button } from "@/features/common";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { Box, Divider, Grid, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import style from './confirmOtp.module.scss';
import { AxiosError } from "axios";

let currentOTPIndex: number;

const ConfirmOtp = () => {
    const { trigger: confirmOtpTrigger } = useRequestMutation(API.verify_account, { method: 'POST' });
    const [otp, setOtp] = useState<string[]>(new Array(7).fill(''));
    const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const [otpError, setOtpError] = useState(null);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
        const { value } = target;
        const newOTP: string[] = [...otp];
        newOTP[currentOTPIndex] = value.substring(value.length - 1);
        if (index == 2 && value) {
            currentOTPIndex = 3;
        }
        if (!value && currentOTPIndex === 4) {
            currentOTPIndex = 3;
        }
        if (!value) {
            setActiveOTPIndex(currentOTPIndex - 1);
        } else {
            setActiveOTPIndex(currentOTPIndex + 1);
        }
        setOtp(newOTP);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPIndex]);

    const handleKeyDownOn = ({ key }: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        currentOTPIndex = index;
        setOtpError(null);
        if (key === 'Backspace') {
            if (currentOTPIndex === 4) {
                setActiveOTPIndex(currentOTPIndex);
            } else {
                setActiveOTPIndex(currentOTPIndex - 1);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const otpCode = otp?.join("");
            await confirmOtpTrigger({ body: { otp: otpCode } });
            setOtpError(null);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setOtpError(error?.response?.data?.message);
            }
        }
    };

    return (
        <Box className={style.confirm_otp_container} component="div">
            <Box component="div" className={style.confirm_otp_content}>
                <Box component="div">
                    <Typography className={style.form_title}>Təsdiq kodu</Typography>
                    <Typography className={style.sub_title}>E-poçtunuza gələn təsdiq kodu daxil edin.</Typography>
                    <Divider className={style.divider} component="hr" />
                </Box>

                <Grid container component="div" className={style.otp_input_container}>
                    {otp?.map((_, index) => (
                        index === 3 ? (
                            <Grid item key={index} sx={{
                                height: "100% !importance",
                            }} className={style.hyphen}>
                                <Box component="div" width="100%" height="1px" border="1px solid #2981FF" />
                            </Grid>
                        ) : (
                            <Grid item key={index} textAlign="center">
                                <OutlinedInput
                                    className={style.otp_input}
                                    inputProps={{
                                        style: { textAlign: "center", border: 0, outline: 0 }
                                    }}
                                    inputRef={index === activeOTPIndex ? inputRef : null}
                                    onKeyDown={(e) => handleKeyDownOn(e, index)}
                                    value={otp[index]}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </Grid>
                        )
                    ))}
                </Grid>

                <Box component="div">
                    <Typography fontSize="17px" color="#2981FF">Qalan vaxt: 00:30 </Typography>
                </Box>

                {otpError && <Typography color="red">{otpError}</Typography>}

                <Box component="div" marginTop="83px">
                    <Button variant="primary" onClick={handleSubmit} disabled={activeOTPIndex === 7 ? false : true} fullWidth sx={{
                        textTransform: "capitalize"
                    }}>Təsdiqlə</Button>
                </Box>

                <Box component="div" textAlign="center" paddingBlock="16px">
                    <Button variant="secondary" fullWidth sx={{
                        textTransform: "capitalize"
                    }}>Kodu yenidən göndər</Button>
                </Box>
            </Box>
        </Box>
    )
};

export default ConfirmOtp;