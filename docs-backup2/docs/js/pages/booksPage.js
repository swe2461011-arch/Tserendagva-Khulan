import { renderGridPageLayout } from "../layouts/gridPageLayout.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";

import { renderBookCard } from "../components/bookCard.js";
import {
  renderPdfModal,
  bindPdfModalEvents,
} from "../components/pdfModal.js";

import { getBooks } from "../services/bookService.js";
import { t } from "../i18n/i18n.js";

export function renderBooksPage() {
  const app = document.getElementById("app");

  if (!app) {
    console.error("app element олдсонгүй.");
    return;
  }

  try {
    const books = getBooks();

    app.innerHTML =
      renderGridPageLayout({
        items: books,
        renderItem: renderBookCard,
        pageId: "books",
        pageTitle: t("books.title"),
        emptyContent: renderNotification(
          "Номын мэдээлэл олдсонгүй.",
          "warning"
        ),
      }) + renderPdfModal();

    bindPdfModalEvents();
  } catch (error) {
    console.error("Номын хуудсыг ачаалахад алдаа гарлаа:", error);

    app.innerHTML = renderPageLayout({
      id: "books",
      title: t("books.title"),
      content: renderNotification(
        "Номын мэдээллийг ачаалахад алдаа гарлаа.",
        "danger"
      ),
    });
  }
}
