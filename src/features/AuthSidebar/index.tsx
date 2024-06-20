"use client";
import { gradient } from "@/assets/imgs";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import style from './authSidebar.module.scss';

interface IAuthSidebar {
    children: React.ReactNode
};

const AuthSidebar = ({ children }: IAuthSidebar) => {
    const scrollContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContent = scrollContentRef?.current;
        if (!scrollContent) return;

        const items = Array.from(scrollContent?.children) as HTMLElement[];

        items.forEach((item: HTMLElement) => {
            const clone = item.cloneNode(true);
            scrollContent?.appendChild(clone);
        });
    }, []);

    return (
        <Grid container component="div" sx={{ height: "100vh" }}>
            <Grid className={style.sidebar} item xs={false} sm={4} md={6}>
                <Image src={gradient} alt="" objectFit="cover" layout="fill" quality={100} />

                <Box component="div" className={style.center}>
                    <Box component="div" className={style.animation_center}>
                        <Box component="div" className={style.sidebar_animation_container}>
                            <Typography className={style.sidebar_title}>
                                Servisimizin əsas
                            </Typography>
                            <Box component="div" height="100%" className={style.sentence}>
                                üstünlüyü –
                                <Box component="div" className={style.scroll_container}>
                                    <Box component="div" className={style.scroll_content} ref={scrollContentRef}>
                                        <Box component="div">sürət</Box>
                                        <Box component="div">kömək</Box>
                                        <Box component="div">əlçatanlıq</Box>
                                        <Box component="div">vaxta qənaət</Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Divider component="hr" sx={{
                        borderColor: "#2981FF",
                        opacity: "0.2",
                        width: "100%"
                    }} />

                    <Box component="div" sx={{
                        fontWeight: 500,
                        fontSize: "16px",
                        display: "flex",
                        columnGap: "70px",
                        paddingBlock: "36px"
                    }}>
                        <Link href="/">Qaydalar</Link>
                        <Link href="/">FAQ</Link>
                        <Link href="/">Info</Link>
                        <Link href="/">Məxfilik</Link>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={12} lg={6} height="100%">
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                }}>

                    <Container maxWidth="sm" sx={{
                        width: "100%",
                        height: "100%",
                        padding: 0,
                    }}>
                        {children}
                    </Container>

                    <Divider component="hr" sx={{
                        borderColor: "#2981FF",
                        opacity: "0.2",
                        width: "100%"
                    }} />

                    <Container maxWidth="sm" sx={{
                        paddingBlock: "36px"
                    }}>
                        <Typography color="#000000" fontWeight={500} textAlign="right">© 2024 Issue Solver</Typography>
                    </Container>
                </Box>
            </Grid>
        </Grid>
    )
}

export default AuthSidebar;