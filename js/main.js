document.addEventListener("DOMContentLoaded", function () {
  if (document.body) {
    window.requestAnimationFrame(function () {
      document.body.classList.add("is-ready");
    });
  }

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
  document.querySelectorAll("[data-facebook-link]").forEach(function (el) {
    el.setAttribute("href", data.facebookUrl || "#");
  });
  document.querySelectorAll("[data-whatsapp-link]").forEach(function (el) {
    el.setAttribute("href", data.whatsappUrl || ("https://wa.me/" + String(data.phoneRaw || "").replace(/\D/g, "")));
  });
  document.querySelectorAll("[data-trustpilot-link]").forEach(function (el) {
    el.setAttribute("href", data.trustpilotUrl || "#");
  });

  const instagramFeeds = Array.from(document.querySelectorAll("[data-instagram-feed]"));
  if (instagramFeeds.length) {
    const instagramFallbacks = Array.from(document.querySelectorAll("[data-instagram-fallback]"));
    const postUrls = Array.isArray(data.instagramPostUrls)
      ? data.instagramPostUrls.filter(function (url) {
          return typeof url === "string" && /instagram\.com\/(p|reel)\//i.test(url);
        })
      : [];

    const showFallback = function (show) {
      instagramFallbacks.forEach(function (el) {
        el.hidden = !show;
      });
    };

    if (!postUrls.length) {
      showFallback(true);
    } else {
      instagramFeeds.forEach(function (feed) {
        const limit = Number(feed.getAttribute("data-post-limit")) || 2;
        const posts = postUrls.slice(0, Math.max(1, limit));
        const markup = posts
          .map(function (url) {
            return (
              '<blockquote class="instagram-media" data-instgrm-permalink="' +
              url +
              '?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14"></blockquote>'
            );
          })
          .join("");

        feed.innerHTML = markup;
      });

      showFallback(false);

      const processEmbeds = function () {
        if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === "function") {
          window.instgrm.Embeds.process();
        }
      };

      if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.instagram.com/embed.js";
        script.onload = processEmbeds;
        document.body.appendChild(script);
      } else {
        processEmbeds();
      }
    }
  }

  const topbar = document.querySelector(".topbar");
  if (topbar) {
    const updateTopbarState = function () {
      topbar.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    updateTopbarState();
    window.addEventListener("scroll", updateTopbarState, { passive: true });
  }

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

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compactMotion = window.matchMedia("(max-width: 760px)").matches;

  const revealSelectors = [
    ".hero-card",
    ".page-hero-panel",
    ".section-head",
    ".split > div",
    ".panel",
    ".card",
    ".service-card",
    ".review-card",
    ".contact-card",
    ".stat-card",
    ".work-card",
    ".social-card",
    ".photo-placeholder",
    ".quote-band",
    ".about-photo"
  ];

  const revealTargets = Array.from(document.querySelectorAll(revealSelectors.join(", ")));

  const staggerGroups = [
    ".services-grid",
    ".grid-3",
    ".grid-4",
    ".reviews-grid",
    ".work-grid",
    ".social-grid",
    ".trust-strip",
    ".badge-row",
    ".hero-meta",
    ".fallback-grid",
    ".pill-list",
    ".form-row"
  ];

  staggerGroups.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (group) {
      const children = Array.from(group.children);
      children.forEach(function (child, index) {
        if (!child.matches(".reveal") && !child.matches(".reveal-soft")) {
          child.classList.add("reveal-soft");
        }

        const delayStep = compactMotion ? 28 : 64;
        const maxDelay = compactMotion ? 120 : 420;
        const delay = Math.min(index * delayStep, maxDelay);
        child.style.setProperty("--reveal-delay", delay + "ms");

        if (!revealTargets.includes(child)) {
          revealTargets.push(child);
        }
      });
    });
  });

  document.querySelectorAll(".section").forEach(function (section, index) {
    if (!section.style.getPropertyValue("--reveal-delay")) {
      const baseDelay = compactMotion ? 0 : Math.min(index * 24, 144);
      section.style.setProperty("--reveal-delay", baseDelay + "ms");
    }

    if (!section.classList.contains("reveal") && !section.classList.contains("reveal-soft")) {
      section.classList.add("reveal");
      revealTargets.push(section);
    }
  });

  if (!reduceMotion && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      if (!el.classList.contains("reveal") && !el.classList.contains("reveal-soft")) {
        el.classList.add("reveal");
      }
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.14 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (!reduceMotion && !compactMotion) {
    const parallaxTargets = Array.from(
      document.querySelectorAll(".hero-visual, .hero-card-main, .quote-band, .photo-placeholder, .work-image, .page-hero-panel")
    );

    parallaxTargets.forEach(function (el, index) {
      el.classList.add("parallax-item");
      el.setAttribute("data-parallax-depth", index % 3 === 0 ? "12" : index % 2 === 0 ? "9" : "6");
      el.style.setProperty("--parallax-y", "0px");
    });

    const updateParallax = function () {
      const viewportHeight = window.innerHeight || 1;

      parallaxTargets.forEach(function (el) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > viewportHeight + 120) {
          return;
        }

        const centerDelta = rect.top + rect.height / 2 - viewportHeight / 2;
        const progress = centerDelta / viewportHeight;
        const maxShift = Number(el.getAttribute("data-parallax-depth")) || 8;
        const y = Math.max(-maxShift, Math.min(maxShift, -progress * maxShift));

        el.style.setProperty("--parallax-y", y.toFixed(2) + "px");
      });
    };

    updateParallax();

    let ticking = false;
    const requestParallaxUpdate = function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);
  }
});
