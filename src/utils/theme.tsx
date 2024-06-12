"use client";
import { experimental_extendTheme as extendTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    default: true;
    disabled: true;
  }
}
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
          light: "#2981FF",
          main: "#315AB5",
        },
        primary: {
          main: "#2981FF",
          light: "#B2C5FF",
          dark: "#0D419C",
          contrastText: "#0169FE",
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
          primary: "#fff",
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
            variant: "primary",
          },
          style: ({ theme }) => ({
            padding: "12px 24px 12px 24px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            textTransform: "none",
            fontSize: "13px",
            fontWeight: "500",
            lineHeight: "16px",
            color: theme.palette.text.primary,
            background: theme.palette.primary.main,
            "& > .MuiButton-endIcon > svg": {
              fontSize: "12px ",
            },
            "&:hover": {
              background: theme.palette.primary.light,
            },
            "&:active": {
              background: theme.palette.primary.dark,
            },
            [theme.breakpoints.between("md", "xl")]: {
              padding: "14.77px 22.15px",
              "& > .MuiButton-endIcon > svg": {
                fontSize: "14px ",
              },
            },
            [theme.breakpoints.up("xl")]: {
              padding: "16px 24px",
              fontSize: "18px",
              lineHeight: "21.98px",
              "& > .MuiButton-endIcon > svg": {
                fontSize: "22px ",
              },
            },
          }),
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // width: "380px",
          // height: "64px",
          padding: "18px 16px",
          borderRadius: "12px",
          backgroundColor: "white",
          border: 0,
          outline: "none",
          fontSize: "14px",
          "&:hover": {
            border: '1px solid #2981FF'
          }
        }
      }
    },
    MuiInputLabel: {
      variants: [
        {
          props: {
            variant: "standard",
          },
          style: {
            fontSize: "15px",
            marginBottom: "8px",
            fontWeight: 500
          }
        }
      ]
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#2981FF"
        }
      }
    }
  },

  breakpoints: {
    values: {
      xs: 480,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  }
});
