/**
 * Shared nav + footer for all Andjix pages.
 * Loaded BEFORE i18n.js so the data-i18n attributes inside the
 * injected markup are translated on the same DOMContentLoaded pass.
 */
(function () {
  function active(href) {
    const path = location.pathname.split('/').pop() || 'index.html';
    return path === href ? ' aria-current="page"' : '';
  }

  const NAV_HTML = `
<nav class="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="Andjix Consulting">
      <img src="assets/logo.svg" alt="Andjix Consulting" />
      <span class="nav-logo-text">Andjix Consulting Inc.</span>
    </a>
    <button class="nav-burger" aria-label="Menu" data-nav-toggle>
      <span></span><span></span><span></span>
    </button>
    <div class="nav-links" data-nav-panel>
      <a href="services-particuliers.html"${active('services-particuliers.html')} data-i18n="nav.individuals">Particuliers</a>
      <a href="services-pme.html"${active('services-pme.html')} data-i18n="nav.sme">PME</a>
      <a href="ia.html"${active('ia.html')} data-i18n="nav.ai">Andjix IA</a>
      <a href="ressources.html"${active('ressources.html')} data-i18n="nav.resources">Ressources</a>
      <a href="about.html"${active('about.html')} data-i18n="nav.about">À propos</a>
      <a href="contact.html"${active('contact.html')} data-i18n="nav.contact">Contact</a>
      <button class="lang-toggle" aria-label="Changer de langue" data-lang-toggle>
        <span data-lang-current>EN</span>
      </button>
      <a href="contact.html#rdv" class="nav-cta" data-i18n="nav.cta">Prendre rendez-vous</a>
    </div>
  </div>
</nav>`;

  const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <img src="assets/logo.svg" alt="Andjix" />
          <div>
            <div class="footer-brand-text">Andjix Consulting Inc.</div>
            <div style="font-size: 0.8125rem; color: var(--text-muted); letter-spacing: 0.08em;">OTTAWA · CANADA</div>
          </div>
        </div>
        <p class="footer-tag" data-i18n="footer.tag">L'intégration réussie pour les nouveaux arrivants et les PME d'Ottawa.</p>
      </div>
      <div>
        <h5 data-i18n="footer.h_individuals">Particuliers</h5>
        <div class="footer-links">
          <a href="services-particuliers.html#impots" data-i18n="footer.l_taxes">Déclaration d'impôts</a>
          <a href="services-particuliers.html#nouveaux-arrivants" data-i18n="footer.l_arrival">Accueil nouveaux arrivants</a>
          <a href="services-particuliers.html#emploi" data-i18n="footer.l_placement">Placement et emploi</a>
          <a href="services-particuliers.html#conseil" data-i18n="footer.l_admin">Conseil administratif</a>
          <a href="services-particuliers.html#forfaits" data-i18n="footer.l_packages">Forfaits 3 à 6 mois</a>
        </div>
      </div>
      <div>
        <h5 data-i18n="footer.h_sme">PME</h5>
        <div class="footer-links">
          <a href="services-pme.html#automatisation" data-i18n="footer.l_automation">Automatisation</a>
          <a href="services-pme.html#constitution" data-i18n="footer.l_incorp">Constitution d'entreprise</a>
          <a href="ia.html" data-i18n="footer.l_bot">Andjix IA</a>
          <a href="ressources.html" data-i18n="footer.l_resources">Ressources</a>
        </div>
      </div>
      <div>
        <h5 data-i18n="footer.h_contact">Contact</h5>
        <div class="footer-links">
          <a href="mailto:info@andjix.ca">info@andjix.ca</a>
          <a href="tel:+16132768401">+1 613 276 8401</a>
          <a href="contact.html#rdv" data-i18n="footer.l_book">Prendre rendez-vous</a>
          <a href="confidentialite.html" data-i18n="footer.l_privacy">Politique de confidentialité</a>
          <a href="mentions-legales.html" data-i18n="footer.l_legal">Mentions légales</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div>© <span id="year"></span> Andjix Consulting Inc. <span data-i18n="footer.rights">Tous droits réservés.</span></div>
      <div data-i18n-html="footer.built">Conçu par <a href="https://giovannielabs.ai" target="_blank" rel="noopener" style="color: inherit; font-weight: 600;">Giovannie Labs</a></div>
    </div>
  </div>
</footer>`;

  document.querySelectorAll('[data-include="nav"]').forEach(el => el.outerHTML = NAV_HTML);
  document.querySelectorAll('[data-include="footer"]').forEach(el => el.outerHTML = FOOTER_HTML);

  // Mobile nav toggle (after injection)
  const burger = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-nav-panel]');
  if (burger && panel) {
    burger.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }
})();
