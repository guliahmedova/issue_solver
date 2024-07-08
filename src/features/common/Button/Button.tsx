import { Button as MuiButton } from "@mui/material";
import { ButtonProps as MuiButtonProps } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface ButtonProps extends Pick<MuiButtonProps, Exclude<keyof MuiButtonProps, "variant">> {
  handleClick?: () => void;
  variant: "primary" | "secondary" | "text";
  showIcon?: boolean;
}

export default function Button({
  variant,
  handleClick,
  showIcon = false,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      onClick={handleClick}
      endIcon={showIcon ? <ArrowRightAltIcon /> : null}
      fullWidth
      {...restProps}
    >
      {children}
    </MuiButton>
  );
}
