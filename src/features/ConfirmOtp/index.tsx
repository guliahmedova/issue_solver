"use client";
import { Button } from "@/features/common";
import { Box, Divider, Grid, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import style from './confirmOtp.module.scss';

let currentOTPIndex: number;

const ConfirmOtp = () => {
    const [otp, setOtp] = useState<string[]>(new Array(7).fill(''));
    const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
    const [activeIndexClass, setActiveIndexClass] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = ({ target }: any, index: number): void => {
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
            setActiveIndexClass(index);
        }
        setOtp(newOTP);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPIndex]);

    const handleKeyDownOn = (e: any, index: number) => {
        currentOTPIndex = index;
        if (e.key === 'Backspace') {
            if (currentOTPIndex === 4) {
                setActiveOTPIndex(currentOTPIndex);
            } else {
                setActiveOTPIndex(currentOTPIndex - 1);
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

                <Box component="div" marginTop="83px">
                    <Button variant="primary" fullWidth sx={{
                        textTransform: "capitalize"
                    }}>Təsdiqlə</Button>
                </Box>

                <Box component="div" textAlign="center" paddingBlock="16px">
                    <Typography fontSize="18px" color="#2981FF">Kodu yenidən göndər</Typography>
                </Box>
            </Box>
        </Box>
    )
};

export default ConfirmOtp;