/* Initialize after carousel cloning, with the existing scroll controller. */
function initializePodiumReveal(controller) {
  const section = document.querySelector('.vehicle-slider-section');
  if (!section) return;
  const wrappers = section.querySelectorAll('.vehicle-reveal-inner');
  const light = section.querySelector('.podium-radial-light');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealDistance = 220;
  const holdDistance = 900;
  let scene, timeline, pinned = false;
  function showWithoutMotion() {
    if (scene) scene.destroy(true);
    if (timeline) timeline.kill();
    scene = timeline = null;
    pinned = false;
    section.classList.remove('podium-scroll-reveal');
    if (light) light.style.removeProperty('opacity');
    wrappers.forEach(element => {
      element.style.removeProperty('opacity');
      element.style.removeProperty('transform');
    });
  }
  function fitPin() {
    if (!scene) return;
    const fits = section.getBoundingClientRect().height <= window.innerHeight + 2;
    if (pinned && !fits) scene.removePin(true);
    scene.triggerHook(fits ? 0 : 0.35);
    if (!pinned && fits) scene.setPin(section, { pushFollowers: true });
    pinned = fits;
    scene.refresh();
  }
  function configure() {
    showWithoutMotion();
    if (preference.matches || typeof gsap === 'undefined' || typeof ScrollMagic === 'undefined') return;
    try {
      section.classList.add('podium-scroll-reveal');
      // Timeline units represent scroll distance, not elapsed time.
      timeline = gsap.timeline({ defaults: { ease: 'none' } })
        .fromTo(wrappers, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: revealDistance }, 0);
      if (light) {
        timeline.fromTo(light, { opacity: 0 },
          { opacity: 1, duration: revealDistance, ease: 'power1.inOut' }, 0);
      }
      timeline.to({}, { duration: holdDistance }, revealDistance);
      scene = new ScrollMagic.Scene({
        triggerElement: section, triggerHook: 0,
        duration: revealDistance + holdDistance,
        reverse: true, tweenChanges: false
      }).setTween(timeline).addTo(controller);
      fitPin();
      controller.update(true);
    } catch (error) { showWithoutMotion(); }
  }
  preference.addEventListener('change', configure);
  window.addEventListener('resize', fitPin);
  configure();
}
