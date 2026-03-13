document.addEventListener("DOMContentLoaded", function () {
  const consentStorageKey = "mrfinefinish-cookie-consent";
  let optionalResourcesLoaded = false;

  const readConsentChoice = function () {
    try {
      return window.localStorage.getItem(consentStorageKey);
    } catch (error) {
      return null;
    }
  };

  const storeConsentChoice = function (value) {
    try {
      window.localStorage.setItem(consentStorageKey, value);
    } catch (error) {
      return;
    }
  };

  const createTiktokEmbed = function (host) {
    const username = host.getAttribute("data-tiktok-username");
    if (!username) {
      return;
    }

    host.innerHTML = "";

    const blockquote = document.createElement("blockquote");
    blockquote.className = "tiktok-embed";
    blockquote.setAttribute("cite", "https://www.tiktok.com/@" + username);
    blockquote.setAttribute("data-unique-id", username);
    blockquote.setAttribute("data-embed-type", "creator");
    blockquote.style.maxWidth = "780px";
    blockquote.style.minWidth = "280px";

    const section = document.createElement("section");
    const link = document.createElement("a");
    link.href = "https://www.tiktok.com/@" + username + "?refer=creator_embed";
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "@" + username;
    section.appendChild(link);
    blockquote.appendChild(section);
    host.appendChild(blockquote);
  };

  const loadOptionalResources = function () {
    if (optionalResourcesLoaded) {
      return;
    }

    document.querySelectorAll("[data-cookie-href]").forEach(function (el) {
      const href = el.getAttribute("data-cookie-href");
      const rel = el.getAttribute("data-cookie-rel");

      if (href) {
        el.setAttribute("href", href);
      }

      if (rel) {
        el.setAttribute("rel", rel);
      }

      el.removeAttribute("data-cookie-href");
      el.removeAttribute("data-cookie-rel");
    });

    document.querySelectorAll('[data-cookie-embed="tiktok"]').forEach(function (host) {
      createTiktokEmbed(host);
    });

    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.tiktok.com/embed.js";
      document.body.appendChild(script);
    }

    optionalResourcesLoaded = true;
  };

  const ensureDeclinedPlaceholders = function () {
    document.querySelectorAll('[data-cookie-embed="tiktok"]').forEach(function (host) {
      if (!host.querySelector(".consent-embed-placeholder")) {
        host.innerHTML =
          '<div class="consent-embed-placeholder">' +
          "<strong>TikTok content is optional.</strong>" +
          '<p class="small-text">You declined optional cookies, so this preview stays off. You can still open the TikTok profile directly using the page link.</p>' +
          "</div>";
      }
    });
  };

  const updateConsentState = function (choice) {
    if (document.body) {
      document.body.setAttribute("data-cookie-consent", choice || "pending");
    }

    if (choice === "accepted") {
      loadOptionalResources();
    } else {
      ensureDeclinedPlaceholders();
    }
  };

  const renderConsentBanner = function () {
    if (document.querySelector("[data-cookie-banner]")) {
      return;
    }

    const banner = document.createElement("aside");
    banner.className = "cookie-banner";
    banner.setAttribute("data-cookie-banner", "");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<div class="cookie-banner__copy">' +
      "<strong>Cookies and external content</strong>" +
      '<p class="small-text">This site can load optional third-party content such as Google Fonts and TikTok previews. Accept to allow that content, or decline to keep only essential site features. We only store your choice so the banner does not keep reappearing.</p>' +
      "</div>" +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="button button-secondary" data-cookie-decline>Decline</button>' +
      '<button type="button" class="button button-primary" data-cookie-accept>Accept</button>' +
      "</div>";

    document.body.appendChild(banner);

    const dismissBanner = function () {
      banner.classList.add("is-hidden");
      window.setTimeout(function () {
        banner.remove();
      }, 220);
    };

    banner.querySelector("[data-cookie-accept]").addEventListener("click", function () {
      storeConsentChoice("accepted");
      updateConsentState("accepted");
      dismissBanner();
    });

    banner.querySelector("[data-cookie-decline]").addEventListener("click", function () {
      storeConsentChoice("declined");
      updateConsentState("declined");
      dismissBanner();
    });
  };

  const consentChoice = readConsentChoice();
  updateConsentState(consentChoice);

  if (!consentChoice) {
    renderConsentBanner();
  }

  const currentPath = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const navItems = [
    { href: "index.html", label: "Home" },
    { href: "services.html", label: "Services" },
    { href: "work.html", label: "Our Work" },
    { href: "reviews.html", label: "Reviews" },
    { href: "about.html", label: "About" }
  ];

  const headerHost = document.querySelector("[data-site-header]");
  if (headerHost) {
    const navMarkup = navItems
      .map(function (item) {
        const activeClass = item.href === currentPath ? ' class="active"' : "";
        return '<a' + activeClass + ' href="' + item.href + '">' + item.label + "</a>";
      })
      .join("");

    headerHost.innerHTML =
      '<header class="topbar">' +
      '<div class="container nav">' +
      '<a class="brand" href="index.html">' +
      '<img class="brand-logo" src="assets/logo-full.svg" alt="Mr Fine Finish logo">' +
      '<span class="brand-copy">' +
      '<span class="brand-mark" data-business-name>Mr Fine Finish</span>' +
      '<span class="brand-sub">Painting, decorating &amp; plastering</span>' +
      "</span>" +
      "</a>" +
      '<button class="menu-toggle" data-menu-toggle aria-label="Open menu" aria-expanded="false">&#9776;</button>' +
      '<nav class="nav-links" data-nav-links>' +
      navMarkup +
      '<a class="button button-primary" href="contact.html">Get a Quote</a>' +
      "</nav>" +
      "</div>" +
      "</header>";
  }

  const footerHost = document.querySelector("[data-site-footer]");
  if (footerHost) {
    footerHost.innerHTML =
      '<footer class="footer">' +
      '<div class="container">' +
      '<div class="footer-grid">' +
      "<div>" +
      '<div class="footer-brand">' +
      '<img class="footer-logo" src="assets/logo-full.svg" alt="Mr Fine Finish logo">' +
      "<div>" +
      '<h3 data-business-name>Mr Fine Finish</h3>' +
      '<p class="small-text" data-tagline>Premium painting, decorating and plastering with a clean, modern finish.</p>' +
      "</div>" +
      "</div>" +
      '<p class="small-text" data-service-area>Service area: update this with your town, city, and nearby areas.</p>' +
      '<div class="footer-social" aria-label="Social media links">' +
      '<a class="social-icon-link" data-tiktok-link href="#" target="_blank" rel="noreferrer" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35V2h-3.2v13.15a2.89 2.89 0 1 1-2.89-2.89c.24 0 .47.03.69.08V9.07a6.08 6.08 0 0 0-.69-.04A6.09 6.09 0 1 0 15.82 15V8.54a8.04 8.04 0 0 0 4.77 1.57V6.9c-.34 0-.68-.07-1-.21Z"/></svg></a>' +
      '<a class="social-icon-link" data-instagram-link href="#" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm-.2 1.8A3.75 3.75 0 0 0 3.8 7.55v8.9a3.75 3.75 0 0 0 3.75 3.75h8.9a3.75 3.75 0 0 0 3.75-3.75v-8.9a3.75 3.75 0 0 0-3.75-3.75h-8.9Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z"/></svg></a>' +
      '<a class="social-icon-link" data-facebook-link href="#" target="_blank" rel="noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.25-1.46 1.49-1.46H16.7V4.96c-.31-.04-1.36-.12-2.58-.12-2.55 0-4.29 1.56-4.29 4.42V11H7v3h2.83v8h3.67Z"/></svg></a>' +
      "</div>" +
      "</div>" +
      "<div>" +
      "<h4>Quick links</h4>" +
      '<p><a href="index.html">Home</a></p>' +
      '<p><a href="services.html">Services</a></p>' +
      '<p><a href="work.html">Our Work</a></p>' +
      '<p><a href="reviews.html">Reviews</a></p>' +
      '<p><a href="contact.html">Contact</a></p>' +
      "</div>" +
      "<div>" +
      "<h4>Contact</h4>" +
      '<p><span class="contact-inline"><a data-phone-link href="tel:+447493749547"><span data-phone-display>+44 7493 749547</span></a><a class="whatsapp-link" data-whatsapp-link href="https://wa.me/447493749547" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.55 0 .25 5.29.25 11.8c0 2.08.54 4.11 1.57 5.9L0 24l6.5-1.7a11.78 11.78 0 0 0 5.56 1.42h.01c6.5 0 11.8-5.29 11.8-11.8 0-3.15-1.23-6.1-3.35-8.44Zm-8.46 18.25h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.86 1.01 1.03-3.76-.23-.38a9.86 9.86 0 0 1-1.52-5.2c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.02 6.98 2.9a9.8 9.8 0 0 1 2.88 6.98c0 5.45-4.44 9.89-9.88 9.89Zm5.42-7.4c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.47-1.74-1.65-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.94-2.25-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.04-1.06 2.52 0 1.48 1.08 2.92 1.23 3.12.15.2 2.1 3.21 5.1 4.5.71.3 1.27.48 1.7.61.71.22 1.36.19 1.87.11.57-.08 1.78-.73 2.03-1.44.25-.71.25-1.33.17-1.45-.08-.12-.28-.2-.58-.35Z"/></svg></a></span></p>' +
      '<p><a data-email-link href="mailto:hello@mrfinefinish.co.uk"><span data-email>hello@mrfinefinish.co.uk</span></a></p>' +
      '<p><a class="footer-link-with-icon" data-instagram-link href="https://www.instagram.com/mrfinefinish" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm-.2 1.8A3.75 3.75 0 0 0 3.8 7.55v8.9a3.75 3.75 0 0 0 3.75 3.75h8.9a3.75 3.75 0 0 0 3.75-3.75v-8.9a3.75 3.75 0 0 0-3.75-3.75h-8.9Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z"/></svg><span>Instagram</span></a></p>' +
      '<p><a class="footer-link-with-icon" data-tiktok-link href="https://www.tiktok.com/@mr.fine.finish" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35V2h-3.2v13.15a2.89 2.89 0 1 1-2.89-2.89c.24 0 .47.03.69.08V9.07a6.08 6.08 0 0 0-.69-.04A6.09 6.09 0 1 0 15.82 15V8.54a8.04 8.04 0 0 0 4.77 1.57V6.9c-.34 0-.68-.07-1-.21Z"/></svg><span>TikTok</span></a></p>' +
      '<p><a class="footer-link-with-icon" data-facebook-link href="#" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.25-1.46 1.49-1.46H16.7V4.96c-.31-.04-1.36-.12-2.58-.12-2.55 0-4.29 1.56-4.29 4.42V11H7v3h2.83v8h3.67Z"/></svg><span>Facebook</span></a></p>' +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom"><span>&copy; <span data-current-year></span> <span data-business-name>Mr Fine Finish</span></span></div>' +
      "</div>" +
      "</footer>";
  }

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

      if (readConsentChoice() !== "accepted") {
        showFallback(true);
      } else if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
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
