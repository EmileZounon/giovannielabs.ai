/**
 * Shared page initialization for Andjix.
 * - Adds 'js' class so reveal-on-scroll CSS kicks in
 * - Sets the footer year
 * - Triggers reveal animations via IntersectionObserver, with a 2s fallback
 *   so content always becomes visible even when the observer misses an element
 *   (e.g. printing, prefers-reduced-motion, fast scrolling, screenshot tools)
 * - Handles nav scrolled state
 */
(function () {
  document.documentElement.classList.add('js');

  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const siblings = [...e.target.parentElement.children].filter(c => c.classList.contains('reveal'));
        const i = siblings.indexOf(e.target);
        if (i > 0) e.target.style.transitionDelay = (i * 80) + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('in'));
  }

  setTimeout(() => els.forEach(el => el.classList.add('in')), 2000);

  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
