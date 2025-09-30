import type { JSX } from "keycloakify/tools/JSX";
import { useState, useLayoutEffect } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import StyledTextField from "../components/StyledTextField";
import PasswordField from "../components/PasswordField";
import StyledButton from "../components/StyledButton";
import useFormikJoi from "../hooks/useFormikJoi.tsx";
import Joi from "joi";
import buildPasswordSchema from "../utils/buildPasswordSchema.tsx";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
  UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
  doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes
  });

  const {
    messageHeader,
    url,
    messagesPerField,
    recaptchaRequired,
    recaptchaVisible,
    recaptchaSiteKey,
    recaptchaAction,
    termsAcceptanceRequired,
    realm,
    passwordPolicies
  } = kcContext;

  const { msg, msgStr, advancedMsg } = i18n;

  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  useLayoutEffect(() => {
    (window as any)["onSubmitRecaptcha"] = () => {
      // @ts-expect-error
      document.getElementById("kc-register-form").requestSubmit();
    };

    return () => {
      delete (window as any)["onSubmitRecaptcha"];
    };
  }, []);

  interface FormValues {
    password: string;
    email: string;
    username?: string;
    firstName: string;
    lastName: string;
    "password-confirm": string;
  }

  const schema = Joi.object({
    password: buildPasswordSchema(passwordPolicies),

    "password-confirm": Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
      "string.empty": "Please confirm your password"
    }),

    email: Joi.string().messages({ "string.empty": "Please specify email." }),
    firstName: Joi.string().messages({ "string.empty": "Please specify first name." }),
    lastName: Joi.string().messages({ "string.empty": "Please specify last name." }),

    ...(!realm.registrationEmailAsUsername ? { username: Joi.string().messages({ "string.empty": "Please specify username." }) } : {})
  });

  const formik = useFormikJoi<FormValues>(
    {
      password: "",
      "password-confirm": "",

      email: kcContext.profile.attributesByName.email.value ?? "",

      firstName: kcContext.profile.attributesByName.firstName.value ?? "",
      lastName: kcContext.profile.attributesByName.lastName.value ?? "",

      ...(!realm.registrationEmailAsUsername ? { username: kcContext.profile.attributesByName.username.value ?? "" } : {})
    },
    schema
  );

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
      displayMessage={messagesPerField.exists("global")}
      displayRequiredFields
    >
      <form id="kc-register-form" className={kcClsx("kcFormClass")} action={url.registrationAction} method="post" onSubmit={formik.handleSubmit}>
        {!realm.registrationEmailAsUsername && (
          <StyledTextField
            variant="filled"
            label={msg("username")}
            name="username"
            id="username"
            error={messagesPerField.existsError("username") || !!formik.errors["username"]}
            helperText={kcSanitize(messagesPerField.get("username") ?? "") || formik.errors["username"]}
            defaultValue={kcContext.profile.attributesByName.username.value}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        )}
        <StyledTextField
          variant="filled"
          label={msg("email")}
          name="email"
          id="email"
          error={messagesPerField.existsError("email") || !!formik.errors["email"]}
          helperText={kcSanitize(messagesPerField.get("email") ?? "") || formik.errors["email"]}
          defaultValue={kcContext.profile.attributesByName.email.value}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <StyledTextField
          variant="filled"
          label={msg("firstName")}
          name="firstName"
          id="firstName"
          error={messagesPerField.existsError("firstName") || !!formik.errors["firstName"]}
          helperText={kcSanitize(messagesPerField.get("firstName") ?? "") || formik.errors["firstName"]}
          defaultValue={kcContext.profile.attributesByName.firstName.value}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <StyledTextField
          variant="filled"
          label={msg("lastName")}
          name="lastName"
          id="lastName"
          error={messagesPerField.existsError("lastName") || !!formik.errors["lastName"]}
          helperText={kcSanitize(messagesPerField.get("lastName") ?? "") || formik.errors["lastName"]}
          defaultValue={kcContext.profile.attributesByName.lastName.value}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <PasswordField
          label={msg("password")}
          id="password"
          autoComplete="new-password"
          error={messagesPerField.existsError("password") || !!formik.errors["password"]}
          errorText={kcSanitize(messagesPerField.get("password") ?? "") || formik.errors["password"]}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <PasswordField
          label={msg("passwordConfirm")}
          id="password-confirm"
          autoComplete="new-password"
          errorText={kcSanitize(messagesPerField.get("password-confirm") ?? "") || formik.errors["password-confirm"]}
          error={messagesPerField.existsError("password-confirm") || !!formik.errors["password-confirm"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values["password-confirm"]}
        />
        {termsAcceptanceRequired && (
          <TermsAcceptance
            i18n={i18n}
            kcClsx={kcClsx}
            messagesPerField={messagesPerField}
            areTermsAccepted={areTermsAccepted}
            onAreTermsAcceptedValueChange={setAreTermsAccepted}
          />
        )}
        {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
          <div className="form-group">
            <div className={kcClsx("kcInputWrapperClass")}>
              <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
            </div>
          </div>
        )}
        <div className={kcClsx("kcFormGroupClass")}>
          <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
              <span>
                <a href={url.loginUrl}>{msg("backToLogin")}</a>
              </span>
            </div>
          </div>

          {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
            <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
              <button
                className={clsx(kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"), "g-recaptcha")}
                data-sitekey={recaptchaSiteKey}
                data-callback="onSubmitRecaptcha"
                data-action={recaptchaAction}
                type="submit"
              >
                {msg("doRegister")}
              </button>
            </div>
          ) : (
            <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
              <StyledButton fullWidth variant="contained" type="submit">
                {msgStr("doRegister")}
              </StyledButton>
            </div>
          )}
        </div>
      </form>
    </Template>
  );
}

function TermsAcceptance(props: {
  i18n: I18n;
  kcClsx: KcClsx;
  messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
  areTermsAccepted: boolean;
  onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
  const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

  const { msg } = i18n;

  return (
    <>
      <div className="form-group">
        <div className={kcClsx("kcInputWrapperClass")}>
          {msg("termsTitle")}
          <div id="kc-registration-terms-text">{msg("termsText")}</div>
        </div>
      </div>
      <div className="form-group">
        <div className={kcClsx("kcLabelWrapperClass")}>
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            className={kcClsx("kcCheckboxInputClass")}
            checked={areTermsAccepted}
            onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
            aria-invalid={messagesPerField.existsError("termsAccepted")}
          />
          <label htmlFor="termsAccepted" className={kcClsx("kcLabelClass")}>
            {msg("acceptTerms")}
          </label>
        </div>
        {messagesPerField.existsError("termsAccepted") && (
          <div className={kcClsx("kcLabelWrapperClass")}>
            <span
              id="input-error-terms-accepted"
              className={kcClsx("kcInputErrorMessageClass")}
              aria-live="polite"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(messagesPerField.get("termsAccepted"))
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
