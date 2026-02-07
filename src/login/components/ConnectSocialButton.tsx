import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import StyledButton from "./StyledButton";

type ConnectSocialButtonProps = {
  /** Componente de ícono de MUI que se mostrará a la izquierda */
  startIcon?: React.ElementType<SvgIconProps>;
  /** Contenido del botón */
  children: React.ReactNode;
};

function ConnectSocialButton({
  startIcon: StartIcon,
  children
}: ConnectSocialButtonProps) {
  return (
    <StyledButton
      size="large"
      variant="contained"
      startIcon={StartIcon ? <StartIcon /> : undefined}
      fullWidth
      sx={{
        backgroundColor: "#fff",
        border: "1px solid #B7B7B7",
        color: "#C0C3CC",
        marginBottom: "8px",
        "&:hover": {
          backgroundColor: "#D8DBE0",
          borderColor: "#D8DBE0",
          boxShadow: "none",
          color: "black"
        },
        "&:active": {
          backgroundColor: "#D8DBE0",
          borderColor: "#D8DBE0",
          boxShadow: "none",
          color: "black"
        },
        "&:focus": {
          boxShadow: "none"
        }
      }}
    >
      {children}
    </StyledButton>
  );
}

export default ConnectSocialButton;
