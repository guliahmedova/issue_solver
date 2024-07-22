"use client";
import { gradient } from "@/assets/imgs";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef } from "react";
import style from "./authSidebar.module.scss";

interface IAuthSidebar {
  children: React.ReactNode;
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
    <Grid container component="div" className="h-screen">
      <Grid className='relative h-full w-6/12 hidden lg:block' item>
        <Image src={gradient} alt="" style={{ objectFit: "cover" }} fill quality={100} priority={true} />

        <Box component="div" className='absolute z-10 h-full w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-between'>
          <Box component="div" className='h-screen flex flex-col items-start justify-center'>

            <Box component="div" className='flex flex-col justify-center items-start gap-0 font-bold text-[40px] select-none'>
              <div className=''>Servisimizin əsas</div>
              <Box component="div" height="100%" className='flex items-center gap-4 text-[#212121]'>
                üstünlüyü –
                <Box component="div" className='w-auto h-12 overflow-hidden relative inline-block'>
                  <Box component="div" className={`flex flex-col ${style.scroll_content}`} ref={scrollContentRef}>
                    <Box component="div" className="h-12 leading-[48px] flex text-[#2981ff]">sürət</Box>
                    <Box component="div" className="h-12 leading-[48px] flex text-[#2981ff]">kömək</Box>
                    <Box component="div" className="h-12 leading-[48px] flex text-[#2981ff]">əlçatanlıq</Box>
                    <Box component="div" className="h-12 leading-[48px] flex text-[#2981ff]">vaxta qənaət</Box>
                  </Box>
                </Box>
              </Box>
            </Box>

          </Box>
        </Box>
      </Grid>

      <Grid item className='lg:w-6/12 h-full md:w-7/12 sm:w-10/12 w-full mx-auto'>
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthSidebar;
