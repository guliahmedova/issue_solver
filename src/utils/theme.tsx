"use client";
import { experimental_extendTheme as extendTheme } from "@mui/material";

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        divider: "#E5E8EC",
        background: {
          paper: "#ffffff",
          default: "#ffffff",
        },
        info: {
          dark: "#01579b",
          light: "#03a9f4",
          main: "#315AB5",
        },
        primary: {
          main: "#315AB5",
          light: "#B2C5FF",
          dark: "#0D419C",
        },
        secondary: {
          main: "#585E71",
          light: "#DCE2F9",
          dark: "#404659",
        },
        success: {
          main: "#1aa251",
          light: "rgb(71, 180, 115)",
          dark: "rgb(18, 113, 56)",
        },
        text: {
          primary: "#20262d",
          secondary: "#2f3a45",
        },
        error: {
          dark: "#c62828",
          light: "#ef5350",
          main: "#d32f2f",
        },
        warning: {
          dark: "#e65100",
          light: "#ff9800",
          main: "#ed6c02",
        },
      },
    },
    dark: {
      palette: {
        divider: "#132F4C",
        background: {
          paper: "#0A1929",
          default: "#001E3C",
        },
        info: {
          dark: "#315AB5",
          light: "#4fc3f7",
          main: "#29b6f6",
        },
        primary: {
          main: "#3399FF",
          dark: "rgb(35, 107, 178)",
          light: "rgb(51, 152, 255)",
        },
        secondary: {
          main: "#ce93d8",
          light: "#f3e5f5",
          dark: "#ab47bc",
        },
        success: {
          main: "#1DB45A",
          light: "rgb(74, 195, 123)",
          dark: "rgb(20, 125, 62)",
        },
        text: {
          primary: "#fff",
          secondary: "#AAB4BE",
        },
        error: {
          dark: "#d32f2f",
          light: "#e57373",
          main: "#f44336",
        },
        warning: {
          dark: "#f57c00",
          light: "#ffb74d",
          main: "#ffa726",
        },
      },
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            variant: "text",
          },
          style: {
            width: "150px",
            height: "40px",
            padding: "12px 24px 12px 24px",
            gap: "10px",
          },
        },
      ],
    },
  },
});
