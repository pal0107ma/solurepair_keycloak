import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  FilledInputProps
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { styles } from "./StyledTextField";

interface PasswordFieldProps extends FilledInputProps {
  errorText?: string;
  label?: any;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  id,
  error,
  errorText = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl fullWidth variant="filled" sx={styles} error={error}>
      <InputLabel htmlFor={id} error={error}>
        {label}
      </InputLabel>
      <FilledInput
        error={error}
        type={showPassword ? "text" : "password"}
        name={id}
        id={id}
        {...props}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small"
              aria-label={showPassword ? "hide the password" : "display the password"}
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon sx={{ color: "#C0C3CC" }} />
              ) : (
                <VisibilityOutlinedIcon sx={{ color: "#C0C3CC" }} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordField;
