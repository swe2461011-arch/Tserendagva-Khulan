export async function renderBooksPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    content: renderNotification("Loading books..."),
  });

  try {
    const books = getBooks();
    console.log("Books data:", books);           // ← энэ мөрийг нэм
    console.log("Books length:", books.length);  // ← энэ мөрийг нэм

    app.innerHTML =
      renderGridPageLayout({
        pageId: "books",
        pageTitle: t("books.title"),
        items: books,
        renderItem: renderBookCard,
        emptyContent: renderNotification("No books found.", "warning"),
      }) + renderPdfModal();

    bindPdfModalEvents();
  } catch (error) {
    app.innerHTML = renderPageLayout({
      content: renderNotification("Failed to load books page.", "danger"),
    });

    console.error("Failed to render books page:", error);
  }
}