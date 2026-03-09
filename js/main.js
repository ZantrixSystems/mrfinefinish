document.addEventListener('DOMContentLoaded', function () {
  const data = window.siteData || {};

  document.querySelectorAll('[data-business-name]').forEach(el => el.textContent = data.businessName || 'Business Name');
  document.querySelectorAll('[data-website-name]').forEach(el => el.textContent = data.websiteName || 'website');
  document.querySelectorAll('[data-tagline]').forEach(el => el.textContent = data.tagline || 'Update tagline');
  document.querySelectorAll('[data-phone-display]').forEach(el => el.textContent = data.phoneDisplay || 'Phone number');
  document.querySelectorAll('[data-email]').forEach(el => el.textContent = data.email || 'Email address');
  document.querySelectorAll('[data-service-area]').forEach(el => el.textContent = data.serviceArea || 'Service area');
  document.querySelectorAll('[data-hours]').forEach(el => el.textContent = data.hours || 'Opening hours');
  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = data.year || new Date().getFullYear());

  document.querySelectorAll('[data-phone-link]').forEach(el => el.setAttribute('href', `tel:${data.phoneRaw || ''}`));
  document.querySelectorAll('[data-email-link]').forEach(el => el.setAttribute('href', `mailto:${data.email || ''}`));
  document.querySelectorAll('[data-instagram-link]').forEach(el => el.setAttribute('href', data.instagramUrl || '#'));
  document.querySelectorAll('[data-tiktok-link]').forEach(el => el.setAttribute('href', data.tiktokUrl || '#'));
  document.querySelectorAll('[data-trustpilot-link]').forEach(el => el.setAttribute('href', data.trustpilotUrl || '#'));

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-nav-links]');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
});
