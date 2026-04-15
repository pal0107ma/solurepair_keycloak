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
        border: "1px solid #A8C2C8",
        color: "#9CA3AF",
        marginBottom: "8px",
        borderRadius: "50px",
        "&:hover": {
          backgroundColor: "#F3F4F6",
          borderColor: "#A8C2C8",
          boxShadow: "none",
          color: "#4B5563"
        },
        "&:active": {
          backgroundColor: "#E5E7EB",
          borderColor: "#A8C2C8",
          boxShadow: "none",
          color: "#4B5563"
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
