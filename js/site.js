/* Clearspoken — page behaviour: scroll reveals, menu, anchors, accordion, read more. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* --- Scroll reveals -------------------------------------------------- */
  // Children of a [data-stagger] group, and the lines of a heading, come in one after another.
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    [...group.children].filter((el) => el.hasAttribute('data-reveal'))
      .forEach((el, i) => el.style.setProperty('--d', Math.min(i, 6)));
  });
  document.querySelectorAll('.lines').forEach((heading) => {
    heading.querySelectorAll('.line').forEach((line, i) => line.firstElementChild.style.setProperty('--d', i));
  });

  const targets = document.querySelectorAll('[data-reveal], .lines');
  const show = (el) => el.classList.add('is-in');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(show);
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((el) => io.observe(el));
  }

  /* --- Menu (narrow and medium widths) -------------------------------- */
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
  };
  menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); }
  });

  /* --- In-page links: scroll to the section, smoothly unless motion is reduced */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    if (!menu.hidden) setMenu(false);
    target.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* --- Q&A accordion and "Read more" on the question cards ------------- */
  const toggle = (btn) => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
    return !open;
  };
  document.querySelectorAll('.acc__item button').forEach((btn) => btn.addEventListener('click', () => toggle(btn)));
  document.querySelectorAll('.qcard button').forEach((btn) => btn.addEventListener('click', () => {
    btn.querySelector('span').textContent = toggle(btn) ? 'Read less' : 'Read more';
  }));
})();
