export function renderPdfModal() {
  return `
    <div class="modal" id="pdfModal">
      <div class="modal-background" data-close-pdf></div>

      <div
        class="modal-content book-pdf-modal-content"
        style="width:95vw; max-width:1100px; height:90vh; max-height:none; margin:0;"
      >
        <iframe
          id="pdfFrame"
          class="book-pdf-frame"
          style="width:100%; height:100%; border:none; background:#fff;"
          src=""
          title="PDF viewer"
        ></iframe>
      </div>

      <button class="modal-close is-large" aria-label="close" data-close-pdf></button>
    </div>
  `;
}
export function bindPdfModalEvents() {
  document.querySelectorAll(".book-view-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openPdfModal(button.dataset.pdf);
    });
  });

  document.querySelectorAll("[data-close-pdf]").forEach((button) => {
    button.addEventListener("click", closePdfModal);
  });
}

function openPdfModal(url) {
  const modal = document.getElementById("pdfModal");
  const frame = document.getElementById("pdfFrame");

  if (!modal || !frame || !url) return;

  modal.classList.add("is-active");

  // Эхлээд хоослоод дараа нь PDF-г ачаална
  frame.src = "";

  setTimeout(() => {
    frame.src = `${url}#toolbar=0&navpanes=0&scrollbar=1`;
    // frame.src = `${url}#toolbar=0`;
    // frame.src = `${url}#view=FitH`;
  }, 50);
}

function closePdfModal() {
  const modal = document.getElementById("pdfModal");
  const frame = document.getElementById("pdfFrame");

  if (!modal || !frame) return;

  modal.classList.remove("is-active");
  frame.src = "";
}
