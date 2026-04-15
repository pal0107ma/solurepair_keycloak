import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const StyledButton = styled(Button)<ButtonProps>(() => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "14px 12px",
  lineHeight: 1.5,
  borderRadius: "50px",
  backgroundColor: "#007BFF",
  color: "white",
  "&:hover": {
    backgroundColor: "#0069D9",
    boxShadow: "none",
    color: "white"
  },
  "&:active": {
    backgroundColor: "#0062CC",
    boxShadow: "none",
    color: "white"
  },
  "&:focus": {
    boxShadow: "none"
  }
}));

export default StyledButton;
