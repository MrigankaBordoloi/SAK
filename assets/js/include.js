/**
 * Loads shared header/footer partials into any page that has
 * <div data-include="/partials/header.html"></div> placeholders,
 * then highlights the nav item matching <body data-nav="...">.
 */
(function () {
  async function loadIncludes() {
    const nodes = document.querySelectorAll("[data-include]");
    await Promise.all(
      Array.from(nodes).map(async (node) => {
        const url = node.getAttribute("data-include");
        const res = await fetch(url);
        node.innerHTML = await res.text();
      })
    );
    highlightActiveNav();
  }

  function highlightActiveNav() {
    const activeKey = document.body.getAttribute("data-nav");
    if (!activeKey) return;
    const item = document.querySelector(`#site-nav [data-nav-key="${activeKey}"]`);
    if (!item) return;
    const link = item.querySelector(":scope > a");
    if (link) link.classList.add("bg-primary-deep", "text-accent");
  }

  document.addEventListener("DOMContentLoaded", loadIncludes);
})();
