import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import GoogleSvgIcon from "../components/GoogleSvgIcon.tsx";
import MicrosoftSvgIcon from "../components/MicrosoftSvgIcon.tsx";
import StyledTextField from "../components/StyledTextField.tsx";
import StyledButton from "../components/StyledButton.tsx";
import ConnectSocialButton from "../components/ConnectSocialButton.tsx";
import PasswordField from "../components/PasswordField.tsx";
export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes
  });

  const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const getSvgIcon = (providerId: string) => {
    switch (providerId) {
      case "google":
        return GoogleSvgIcon;
      case "microsoft":
        return MicrosoftSvgIcon;
      default:
        return GoogleSvgIcon;
    }
  };

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError("username", "password")}
      headerNode={msg("loginAccountTitle")}
      displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
      infoNode={
        <div id="kc-registration-container">
          <div id="kc-registration">
            <span>
              {msg("noAccount")}{" "}
              <a tabIndex={8} href={url.registrationUrl}>
                {msg("doRegister")}
              </a>
            </span>
          </div>
        </div>
      }
      socialProvidersNode={
        <>
          {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
            <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
              <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                {social.providers.map((...[p, , providers]) => (
                  <li key={p.alias}>
                    <a
                      id={`social-${p.alias}`}
                      className={kcClsx("kcFormSocialAccountListButtonClass", providers.length > 3 && "kcFormSocialAccountGridItem")}
                      type="button"
                      href={p.loginUrl}
                    >
                      <ConnectSocialButton startIcon={
                        getSvgIcon(p.providerId)
                      }>{p.displayName}</ConnectSocialButton>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      }
    >
      <div id="kc-form">
        <h1 className="custom-title">{msg("loginTitleHtml", 'Hello!')}</h1>
        <div id="kc-form-wrapper">
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={() => {
                setIsLoginButtonDisabled(true);
                return true;
              }}
              action={url.loginAction}
              method="post"
            >
              {!usernameHidden && (
                <StyledTextField
                  fullWidth
                  label={!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
                  id="username"
                  name="username"
                  defaultValue={login.username ?? ""}
                  type="text"
                  error={messagesPerField.existsError("username", "password")}
                  helperText={
                    messagesPerField.existsError("username", "password") ? kcSanitize(messagesPerField.getFirstError("username", "password")) : null
                  }
                  variant="filled"
                />
              )}

              <PasswordField
                id="password"
                error={messagesPerField.existsError("username", "password")}
                errorText={usernameHidden ? kcSanitize(messagesPerField.getFirstError("password", "username")) : undefined}
                label={msg("password")}
              />

              <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                <div id="kc-form-options">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="checkbox">
                      <label>
                        <input tabIndex={5} id="rememberMe" name="rememberMe" type="checkbox" defaultChecked={!!login.rememberMe} />{" "}
                        {msg("rememberMe")}
                      </label>
                    </div>
                  )}
                </div>
                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                  {realm.resetPasswordAllowed && (
                    <span>
                      <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                        {msg("doForgotPassword")}
                      </a>
                    </span>
                  )}
                </div>
              </div>

              <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                <StyledButton
                  disabled={isLoginButtonDisabled}
                  name="login"
                  id="kc-login"
                  type="submit"
                  tabIndex={7}
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  {msgStr("doLogIn")}
                </StyledButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </Template>
  );
}
