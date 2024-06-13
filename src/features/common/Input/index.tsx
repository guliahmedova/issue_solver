import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, InputProps, OutlinedInput } from "@mui/material";
import { get } from 'lodash';
import { useState } from 'react';

interface IMuiInput extends Pick<InputProps, Exclude<keyof InputProps, "icon">> {
    labelVariant?: "filled" | "outlined" | "standard";
    position?: "end" | "start";
    edge?: "end" | "start";
    handleClickShowPassword?: () => void;
    handleMouseDownPassword?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    errorText?: string;
    labelText: string;
    field?: any;
    form?: any;
    type: string;
};

const Input = ({ labelText, labelVariant = "standard", handleMouseDownPassword,
    position = "end", edge = "end", field, form, type = "text", errorText, ...props }: IMuiInput) => {
    const [showPassword, setShowPassword] = useState(false);

    const isError = get(form?.errors, field?.name) && get(form?.touched, field?.name);

    return (
        <Box width="100%" sx={{ marginBottom: "40px" }}>
            <InputLabel variant={labelVariant} error={isError} sx={{ marginBottom: "8px" }}>{labelText}</InputLabel>
            <FormControl error={isError} fullWidth>
                <OutlinedInput
                    margin='normal'
                    fullWidth
                    type={type === "password" && showPassword ? "text" : type}
                    endAdornment={
                        type === "password" ?
                            <InputAdornment position={position}>
                                <IconButton
                                    onClick={() => setShowPassword(prev => !prev)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge={edge}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment> : null
                    }
                    {...props}
                    {...field}
                />
                {isError && (
                    <FormHelperText variant='standard'>{errorText}</FormHelperText>
                )}
            </FormControl>
        </Box>
    );
};

export default Input;