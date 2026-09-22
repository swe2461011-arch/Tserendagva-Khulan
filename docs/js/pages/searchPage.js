import { t } from "../i18n/i18n.js";

import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderSearchPage() {

  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({

    id: "search",

    title: t("search.title"),

    content: `
      <p>${t("search.welcome")}</p>
    `,

  });

}