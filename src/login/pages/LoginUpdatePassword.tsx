import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import StyledButton from "../components/StyledButton.tsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PasswordField from "../components/PasswordField.tsx";
import useFormikJoi from "../hooks/useFormikJoi.tsx";
import Joi from "joi";
import buildPasswordSchema from "../utils/buildPasswordSchema.tsx";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes
  });

  const { msg, msgStr } = i18n;

  const { url, messagesPerField, isAppInitiatedAction, passwordPolicies } = kcContext;

  interface FormValues {
    "password-new": string;
    "password-confirm": string;
  }

  const schema = Joi.object({
    "password-new": buildPasswordSchema(passwordPolicies),

    "password-confirm": Joi.string().valid(Joi.ref("password-new")).required().messages({
      "any.only": "Passwords do not match",
      "string.empty": "Please confirm your password"
    })
  });

  const formik = useFormikJoi<FormValues>({ "password-new": "", "password-confirm": "" }, schema);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("password", "password-confirm")}
      headerNode={msg("updatePasswordTitle")}
    >
      <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post" onSubmit={formik.handleSubmit}>
        <PasswordField
          label={msg("passwordNew")}
          id="password-new"
          error={messagesPerField.existsError("password") || !!formik.errors["password-new"]}
          errorText={kcSanitize(messagesPerField.get("password")) || formik.errors["password-new"]}
          autoComplete="new-password"
          autoFocus
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values["password-new"]}
        />
        <PasswordField
          label={msg("passwordConfirm")}
          id="password-confirm"
          autoComplete="new-password"
          errorText={kcSanitize(messagesPerField.get("password-confirm")) || formik.errors["password-confirm"]}
          error={messagesPerField.existsError("password-confirm") || !!formik.errors["password-confirm"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values["password-confirm"]}
        />

        <div className={kcClsx("kcFormGroupClass")}>
          {/* <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} /> */}

          <FormControlLabel
            id="logout-sessions"
            name="logout-sessions"
            value="on"
            control={
              <Checkbox 
                defaultChecked 
                sx={{ 
                  color: "#A8C2C8", 
                  "&.Mui-checked": { color: "#2F7E8D" } 
                }} 
              />
            }
            label={msg("logoutOtherSessions")}
            sx={{
              color: "#6B7280",
              marginLeft: "0.5rem",
              marginBottom: "1rem",
              "& .MuiFormControlLabel-label": {
                fontSize: "0.95rem",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }
            }}
          />
          <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
            <StyledButton type="submit" tabIndex={7} variant="contained" size="large" fullWidth>
              {msgStr("doSubmit")}
            </StyledButton>

            {isAppInitiatedAction && (
              <button className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")} type="submit" name="cancel-aia" value="true">
                {msg("doCancel")}
              </button>
            )}
          </div>
        </div>
      </form>
    </Template>
  );
}
