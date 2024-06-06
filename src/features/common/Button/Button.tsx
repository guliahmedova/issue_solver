import { Button as MuiButton } from "@mui/material";
import { ButtonProps as MuiButtonProps } from "@mui/material";

interface ButtonProps extends Pick<MuiButtonProps, Exclude<keyof MuiButtonProps, "variant">> {
  handleClick?: () => void;
  variant: "text" | "outlined" | "contained";
}

export default function Button({ variant, handleClick, children, ...restProps }: ButtonProps) {
  return (
    <MuiButton variant={variant} onClick={handleClick} {...restProps}>
      {children}
    </MuiButton>
  );
}
