import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderCalculationPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "calculation",
    title: t("calculation.title"),
    content: `
      <p>${t("calculation.welcome")}</p>
    `,
  });
}