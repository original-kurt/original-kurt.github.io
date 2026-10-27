// originalkurt — shared site behaviour

document.addEventListener("DOMContentLoaded", () => {
  // mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute(
        "aria-expanded",
        nav.classList.contains("open") ? "true" : "false"
      );
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // product gallery
  const mainImg = document.querySelector(".gallery-main img");
  const thumbs = document.querySelectorAll(".gallery-thumbs button");
  if (mainImg && thumbs.length) {
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const src = thumb.querySelector("img").getAttribute("src");
        const full = thumb.dataset.full || src;
        mainImg.setAttribute("src", full);
        mainImg.dataset.full = full;
        thumbs.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });
  }

  // lightbox
  const lightbox = document.querySelector(".lightbox");
  if (mainImg && lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    mainImg.addEventListener("click", () => {
      lightboxImg.setAttribute("src", mainImg.dataset.full || mainImg.src);
      lightbox.classList.add("open");
    });
    const close = () => lightbox.classList.remove("open");
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // inquiry mailto builder
  const inquiryForm = document.querySelector("[data-inquiry]");
  if (inquiryForm) {
    const email = inquiryForm.dataset.inquiry;
    const productName = inquiryForm.dataset.product || "";
    const select = inquiryForm.querySelector("select[name='material']");
    const link = inquiryForm.querySelector("[data-inquiry-link]");

    const buildMailto = () => {
      const material = select ? select.value : "";
      const subject = `Anfrage: ${productName}`;
      const body =
        `Hallo,\n\nich interessiere mich für die ${productName}` +
        (material ? ` in der Ausführung "${material}".` : ".") +
        `\n\nBitte um Kontaktaufnahme bezüglich Verfügbarkeit, Lieferung und Bezahlung.\n\nViele Grüße`;
      const href = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      if (link) link.setAttribute("href", href);
    };

    if (select) select.addEventListener("change", buildMailto);
    buildMailto();
  }
});
