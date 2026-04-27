(function () {
  const STORAGE_KEY = 'andjix.lang';
  const SUPPORTED = ['fr', 'en'];
  const DEFAULT_LANG = 'fr';

  const dictionaries = {};

  function detectLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : DEFAULT_LANG;
  }

  function getByPath(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), obj);
  }

  function applyLang(lang) {
    const dict = dictionaries[lang];
    if (!dict) return;
    document.documentElement.lang = lang;
    document.title = dict._meta?.title || document.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && dict._meta?.description) desc.setAttribute('content', dict._meta.description);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = getByPath(dict, key);
      if (typeof value === 'string') el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const value = getByPath(dict, key);
      if (typeof value === 'string') el.innerHTML = value;
    });

    const toggle = document.querySelector('[data-lang-current]');
    if (toggle) toggle.textContent = lang === 'fr' ? 'EN' : 'FR';

    localStorage.setItem(STORAGE_KEY, lang);
  }

  async function loadDict(lang) {
    if (dictionaries[lang]) return dictionaries[lang];
    const res = await fetch(`i18n/${lang}.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to load ${lang}.json`);
    dictionaries[lang] = await res.json();
    return dictionaries[lang];
  }

  async function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    await loadDict(lang);
    applyLang(lang);
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const initial = detectLang();
    try {
      await setLang(initial);
    } catch (err) {
      console.warn('i18n init failed', err);
    }

    const btn = document.querySelector('[data-lang-toggle]');
    if (btn) {
      btn.addEventListener('click', async () => {
        const current = document.documentElement.lang || DEFAULT_LANG;
        const next = current === 'fr' ? 'en' : 'fr';
        await setLang(next);
      });
    }
  });
})();
