
function openPdfModal(url) {
  const modal = document.getElementById("pdfModal");
  const frame = document.getElementById("pdfFrame");

  if (!modal || !frame || !url) {
    console.error("PDF modal, iframe эсвэл PDF зам олдсонгүй.");
    return;
  }

  const pdfUrl = new URL(url, document.baseURI).href;

  console.log("PDF ачаалах зам:", pdfUrl);

  frame.src = pdfUrl;
  modal.classList.add("is-active");
}
