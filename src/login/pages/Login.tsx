import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import GoogleSvgIcon from "../components/GoogleSvgIcon.tsx";
import StyledTextField, { styles } from "../components/StyledTextField.tsx";
import StyledButton from "../components/StyledButton.tsx";
import ConnectSocialButton from "../components/ConnectSocialButton.tsx";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

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
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            <ConnectSocialButton startIcon={GoogleSvgIcon}>{p.displayName}</ConnectSocialButton>
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
                            className="flex flex-col gap-4"
                        >
                            {!usernameHidden && (
                                <StyledTextField
                                    fullWidth
                                    label={
                                        !realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")
                                    }
                                    id="username"
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    error={messagesPerField.existsError("username", "password")}
                                    helperText={
                                        messagesPerField.existsError("username", "password")
                                            ? kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            : null
                                    }
                                    variant="filled"
                                />
                            )}

                            <FormControl fullWidth variant="filled" sx={styles} error={messagesPerField.existsError("username", "password")}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <FilledInput
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
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
                                {usernameHidden && messagesPerField.existsError("password", "username") && (
                                    <FormHelperText>{kcSanitize(messagesPerField.getFirstError("password", "username"))}</FormHelperText>
                                )}
                            </FormControl>

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
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
