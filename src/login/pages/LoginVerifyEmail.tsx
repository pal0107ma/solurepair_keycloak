import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { msg } = i18n;

  const { url, user } = kcContext;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayInfo
      headerNode={msg("emailVerifyTitle")}
      infoNode={
        <p className="instruction">
          {msg("emailVerifyInstruction2")}
          <br />
          <a href={url.loginAction}>{msg("doClickHere")}</a>
          &nbsp;
          {msg("emailVerifyInstruction3")}
        </p>
      }
    >
      <div id="kc-form" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
        <h1 className="custom-title">{msg("emailVerifyTitle")}</h1>
        <p className="instruction">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
      </div>
    </Template>
  );
}
