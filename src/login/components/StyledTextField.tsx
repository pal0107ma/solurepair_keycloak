import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export const styles = {
  backgroundColor: "white",
  borderRadius: "50px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",
    "& fieldset": {
      borderColor: "#A8C2C8",
    },
    "&:hover fieldset": {
      borderColor: "#2F7E8D",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2F7E8D",
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input": {
    padding: "16px 20px",
    color: "#6B7280",
  },
  "& .MuiInputLabel-root": {
    color: "#9CA3AF",
    transform: "translate(20px, 16px) scale(1)",
  },
  "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
    transform: "translate(20px, -9px) scale(0.75)",
    backgroundColor: "white",
    padding: "0 4px"
  }
};

const StyledTextField = styled(TextField)<TextFieldProps>(() => styles);

export default StyledTextField;
