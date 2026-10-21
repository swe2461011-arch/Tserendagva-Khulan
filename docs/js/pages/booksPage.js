
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
    console.error("app элемент олдсонгүй.");
    return;
  }

  try {
    const books = getBooks();

    console.log("Номын тоо:", books.length);

    app.innerHTML =
      renderGridPageLayout({
        pageId: "books",
        pageTitle: t("books.title"),
        items: books,
        renderItem: renderBookCard,
        emptyContent: renderNotification(
          "Ном олдсонгүй.",
          "warning"
        ),
      }) + renderPdfModal();

    bindPdfModalEvents();
  } catch (error) {
    console.error("Номын хуудас ачаалахад алдаа гарлаа:", error);

    app.innerHTML = renderPageLayout({
      content: renderNotification(
        "Номын хуудас ачаалахад алдаа гарлаа.",
        "danger"
      ),
    });
  }
}
