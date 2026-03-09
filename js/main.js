document.addEventListener("DOMContentLoaded", function () {
  const data = window.siteData || {};

  document.querySelectorAll("[data-business-name]").forEach(function (el) {
    el.textContent = data.businessName || "Business Name";
  });
  document.querySelectorAll("[data-website-name]").forEach(function (el) {
    el.textContent = data.websiteName || "website";
  });
  document.querySelectorAll("[data-tagline]").forEach(function (el) {
    el.textContent = data.tagline || "Update tagline";
  });
  document.querySelectorAll("[data-phone-display]").forEach(function (el) {
    el.textContent = data.phoneDisplay || "Phone number";
  });
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.textContent = data.email || "Email address";
  });
  document.querySelectorAll("[data-service-area]").forEach(function (el) {
    el.textContent = data.serviceArea || "Service area";
  });
  document.querySelectorAll("[data-hours]").forEach(function (el) {
    el.textContent = data.hours || "Opening hours";
  });
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = data.year || new Date().getFullYear();
  });

  document.querySelectorAll("[data-phone-link]").forEach(function (el) {
    el.setAttribute("href", "tel:" + (data.phoneRaw || ""));
  });
  document.querySelectorAll("[data-email-link]").forEach(function (el) {
    el.setAttribute("href", "mailto:" + (data.email || ""));
  });
  document.querySelectorAll("[data-instagram-link]").forEach(function (el) {
    el.setAttribute("href", data.instagramUrl || "#");
  });
  document.querySelectorAll("[data-tiktok-link]").forEach(function (el) {
    el.setAttribute("href", data.tiktokUrl || "#");
  });
  document.querySelectorAll("[data-trustpilot-link]").forEach(function (el) {
    el.setAttribute("href", data.trustpilotUrl || "#");
  });

  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-nav-links]");

  if (toggle && menu) {
    const closeMenu = function () {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  const revealTargets = document.querySelectorAll(
    ".section, .hero-card, .panel, .card, .service-card, .review-card, .contact-card, .stat-card, .work-card, .social-card, .page-hero-panel"
  );

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
});
