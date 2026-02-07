import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export const styles = {
  backgroundColor: "white",
  borderRadius: "8px",
  "& .MuiInputLabel-root": {
    color: "#B2B6BF", // color por defecto
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "white",
    borderRadius: "2em",
    border: "1px solid #A8C2C8", 
    "&:hover": { backgroundColor: "white" },
    "&.Mui-focused": { backgroundColor: "white" },

    // Eliminar el underline en todos los estados
    "&::before, &::after": {
      borderBottom: "none !important"
    },
    "&:hover::before": {
      borderBottom: "none !important"
    },
    "&.Mui-focused::before": {
      borderBottom: "none !important"
    }
  },
  // Alternativa/extra: desactivar la clase underline completa
  "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after": {
    borderBottom: "none !important"
  }
};

const StyledTextField = styled(TextField)<TextFieldProps>(() => styles);

export default StyledTextField;
