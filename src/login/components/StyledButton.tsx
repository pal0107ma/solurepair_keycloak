import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const StyledButton = styled(Button)<ButtonProps>(() => ({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "14px 12px",
    lineHeight: 1.5,
    borderRadius: "8px",
    "&:hover": {
        boxShadow: "none",
        color: "white"
    },
    "&:active": {
        boxShadow: "none",
        color: "white"
    },
    "&:focus": {
        boxShadow: "none"
    }
}));

export default StyledButton;
