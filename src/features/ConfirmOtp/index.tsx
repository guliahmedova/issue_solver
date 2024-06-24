"use client";
import { Button } from "@/features/common";
import API from "@/http/api";
import { useRequestMutation } from "@/http/request";
import { Box, Divider, Grid, OutlinedInput, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import style from './confirmOtp.module.scss';

let currentOTPIndex: number;

const ConfirmOtp = () => {
    const { trigger: confirmOtpTrigger } = useRequestMutation(API.otp_trust, { method: 'POST' });
    const { trigger: resendOtpTrigger } = useRequestMutation(API.resend_otp, { method: 'POST' });
    const [otp, setOtp] = useState<string[]>(new Array(7).fill(''));
    const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const [otpError, setOtpError] = useState(null);
    const [success, setSuccess] = useState<boolean>(true);
    const router = useRouter();
    const [timer, setTimer] = useState(180);

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

    const startCountdown = (onTick: any) => {
        let timerFunc = setInterval(() => {
            onTick((prevTimer: number) => {
                if (prevTimer <= 0) {
                    clearInterval(timerFunc);
                    return 0;
                } else {
                    return prevTimer - 1;
                }
            });
        }, 1000);

        return timerFunc;
    };

    useEffect(() => {
        const timerFunc = startCountdown(setTimer);
        return () => clearInterval(timerFunc);
    }, [timer]);

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
            await confirmOtpTrigger({ body: { otpCode: otpCode } });
            setOtpError(null);
            setSuccess(true);
            router.push("/change-password");
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.log(error);
                setOtpError(error?.response?.data?.message);
                setSuccess(false);
            }
        }
    };

    const handleResendOtpClick = async () => {
        setSuccess(true);
        setOtp(new Array(7).fill(''));
        setActiveOTPIndex(0);
        try {
            setTimer(180);
            const email = "ilkinsuleymanov200@gmail.com";
            await resendOtpTrigger({ body: { email: email } });
            setOtpError(null);
        } catch (error) {
            if (error instanceof AxiosError) {
                setOtpError(error?.response?.data?.message);
            }
        }
    };

    console.log("otpError: ", otpError);

    return (
        <Box className={style.confirm_otp_container} component="div">
            <Box component="div" className={style.confirm_otp_content}>
                <Box component="div">
                    <Typography className={style.form_title}>Təsdiq kodu</Typography>
                    <Typography className={style.sub_title}>E-poçtunuza gələn təsdiq kodunu daxil edin</Typography>
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
                            <Grid item key={index} textAlign="center" >
                                <OutlinedInput
                                    className={style.otp_input}
                                    sx={success ? null : { border: "2px solid #EF5648", backgroundColor: "#FF3D2C0F" }}
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
                    <Typography fontSize="17px" color="#2981FF">Qalan vaxt: {`${Math.floor(timer / 60)}`.padStart(2, "0")}:
                        {`${timer % 60}`.padStart(2, "0")} </Typography>
                </Box>

                {otpError && <Typography color="red">{otpError}</Typography>}

                <Box component="div" marginTop="83px">
                    <Button variant="primary" onClick={handleSubmit} disabled={activeOTPIndex === 7 ? false : true} fullWidth sx={{
                        textTransform: "capitalize"
                    }}>Təsdiqlə</Button>
                </Box>

                <Box component="div" textAlign="center" paddingBlock="16px">
                    <Button variant="secondary" fullWidth onClick={handleResendOtpClick} sx={{
                        textTransform: "capitalize"
                    }}>Kodu yenidən göndər</Button>
                </Box>
            </Box>
        </Box>
    )
};

export default ConfirmOtp;