import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import type { KcContext } from "./KcContext";
import KcPage from "./KcPage";
import { createGetKcContextMock } from "keycloakify/login/KcContext";
import type { KcContextExtension, KcContextExtensionPerPage } from "./KcContext";
import { themeNames, kcEnvDefaults } from "../kc.gen";

const kcContextExtension: KcContextExtension = {
  themeName: themeNames[0],
  properties: {
    ...kcEnvDefaults
  }
};

export const { getKcContextMock: getKcContextMock_base } = createGetKcContextMock({
  kcContextExtension: {},
  kcContextExtensionPerPage: {},
  overrides: {},
  overridesPerPage: {}
});

const kcContextExtensionPerPage: KcContextExtensionPerPage = {
  "login-update-password.ftl": {
    passwordPolicies: getKcContextMock_base({ pageId: "register.ftl" }).passwordPolicies
  }
};

export const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension,
  kcContextExtensionPerPage,
  overrides: {},
  overridesPerPage: {}
});

export function createKcPageStory<PageId extends KcContext["pageId"]>(params: {
  pageId: PageId;
}) {
  const { pageId } = params;

  function KcPageStory(props: {
    kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
  }) {
    const { kcContext: overrides } = props;

    const kcContextMock = getKcContextMock({
      pageId,
      overrides
    });

    return <KcPage kcContext={kcContextMock} />;
  }

  return { KcPageStory };
}
