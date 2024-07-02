"use client";
import { gradient } from "@/assets/imgs";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef } from "react";
import style from "./authSidebar.module.scss";

interface IAuthSidebar {
  children: React.ReactNode;
}

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
      <Grid className={style.sidebar} item>

        <Image src={gradient} alt="" style={{ objectFit: "cover" }} fill quality={100} priority={true} />

        <Box component="div" className={style.center}>
          <Box component="div" className={style.animation_center}>
            <Box component="div" className={style.sidebar_animation_container}>
              <Typography className={style.sidebar_title}>Servisimizin əsas</Typography>
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

          {/* <Divider component="hr" sx={{
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
                    </Box> */}
        </Box>
      </Grid>

      <Grid item height="100%" className={
        style.sidebar_content
      }>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              padding: 0,
            }}
          >
            {children}
          </Box>

          {/* <Divider
            component="hr"
            sx={{
              borderColor: "#2981FF",
              opacity: "0.2",
              width: "100%",
            }}
          />

          <Container
            maxWidth="sm"
            sx={{
              paddingBlock: "36px",
            }}
          >
            <Typography color="#000000" fontWeight={500} textAlign="right">
              © 2024 Issue Solver
            </Typography>
          </Container> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthSidebar;
