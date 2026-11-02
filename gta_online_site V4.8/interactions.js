/* Navigation for the ordinary weekly-news section. */
(() => {
  // The existing ScrollMagic scenes cover pinned sections. Track ordinary
  // sections as well so scrolling into section 03 updates its menu highlight.
  const normalSections = [document.querySelector('.weekly-news-section')].filter(Boolean);
  let framePending = false;
  function updateNavigation() {
    framePending = false;
    const navBottom = document.querySelector('.sticky-nav')?.getBoundingClientRect().bottom || 0;
    const guide = Math.max(navBottom + 24, window.innerHeight * 0.35);
    const current = normalSections.find(element => {
      const bounds = element.getBoundingClientRect();
      return bounds.top <= guide && bounds.bottom > guide;
    });
    if (!current) return;
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`);
    });
  }
  window.addEventListener('scroll', () => {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(updateNavigation);
    }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
})();
