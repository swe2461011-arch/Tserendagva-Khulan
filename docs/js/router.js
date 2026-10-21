export function initRouter(routes) {

    function renderRoute() {

        const hash = window.location.hash || "#/overview";

        const page = routes[hash];

        if (page) {
            page();
        } else {
            const notFound = routes["#/404"];

            if (notFound) {
                notFound();
            }
        }
    }

   if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", renderRoute);
} else {
  renderRoute();
}
window.addEventListener("hashchange", renderRoute);
}