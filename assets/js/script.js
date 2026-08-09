document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header: cambia a sólido al hacer scroll ---------- */
  const header = document.getElementById('site-header');
  const setHeaderState = () => {
    header.classList.toggle('solid', window.scrollY > 40);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  /* ---------- Menú mobile ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  /* ---------- Revelado al hacer scroll (títulos + bloques) ---------- */
  const revealTargets = document.querySelectorAll(
    '.reveal-title, .service-media, .service-text > *, .services-intro > *'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- Fallback prolijo para imágenes que todavía no subiste ---------- */
  document.querySelectorAll('.service-media img').forEach(img => {
    img.addEventListener('error', () => {
      img.closest('.service-media').classList.add('img-fallback');
      img.remove();
    }, { once: true });
  });

})