import { gradient } from "@/assets/imgs";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import style from './authSidebar.module.scss';

interface IAuthSidebar {
    children: React.ReactNode
};

const AuthSidebar = ({ children }: IAuthSidebar) => {
    const words = ['sürət', 'kömək', 'əlçatanlıq', 'vaxta qənaət'];

    return (
        <Grid container component="div" sx={{ height: "100vh" }}>
            <Grid className={style.sidebar} item xs={false} sm={4} md={6} sx={{
                position: "relative",
                height: "100%"
            }}>
                <Image src={gradient} alt="" objectFit="cover" layout="fill" quality={100} />

                <Box component="div" sx={{
                    position: "absolute",
                    zIndex: 1,
                    height: "100%",
                    width: "100%",
                    top: "50%",
                    left: "50%",
                    transform: 'translate(-50%,-50%)',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Box component="div" height="100%" display="flex" flexDirection="column" alignItems="start"
                        justifyContent="center" width={440} flexWrap="nowrap" sx={{
                            userSelect: "none"
                        }}>
                        <Typography component="span" sx={{
                            fontSize: "48px",
                            fontWeight: "bold",
                            color: "#000B1B",
                        }}>Servisimizin əsas üstünlüyü-
                            <Typography component="div" className={style.animated_text}>
                                {words.map((word, index) => (
                                    <Typography component="div" className={style.word} key={index} sx={{
                                        fontSize: "48px",
                                        fontWeight: "bold",
                                        color: "#2981FF"
                                    }}> {word}</Typography>
                                ))}
                            </Typography>
                        </Typography>
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

            <Grid item xs={12} sm={8} md={6} height="100%">
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                }}>
                    <Container maxWidth="sm" sx={{
                        paddingBlock: "36px"
                    }}>
                        <Typography variant="body2" color="#000000" fontWeight={500} textAlign="right">Mode*</Typography>
                    </Container>

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