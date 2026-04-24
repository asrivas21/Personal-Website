anime.timeline()
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInOutExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  });

(function initTimelineScroll() {
  const section = document.querySelector('.timeline');
  const path = document.querySelector('.timeline-path');
  if (!section || !path) return;

  const events = Array.from(document.querySelectorAll('.timeline-event'));
  const totalLength = path.getTotalLength();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  path.style.strokeDasharray = String(totalLength);
  path.style.strokeDashoffset = String(totalLength);

  const eventLengths = events.map(ev => {
    const circle = ev.querySelector('circle');
    const cx = parseFloat(circle.getAttribute('cx'));
    const cy = parseFloat(circle.getAttribute('cy'));
    let bestLen = 0;
    let bestDist = Infinity;
    for (let l = 0; l <= totalLength; l += 2) {
      const p = path.getPointAtLength(l);
      const d = (p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy);
      if (d < bestDist) { bestDist = d; bestLen = l; }
    }
    return bestLen;
  });

  events.forEach(ev => {
    ev.style.opacity = '0';
    ev.style.transition = 'opacity 250ms ease-out';
  });

  // Animation window. START_TRIGGER_VH is how far up from the viewport bottom
  // the section top must travel before drawing begins (0.35 = 35% up).
  // The animation ends once the section is fully in view (its bottom reaches
  // the bottom of the viewport, or its top reaches the top of the viewport
  // for sections shorter than the viewport), which keeps the final event dot
  // on-screen when the line finishes drawing.
  const START_TRIGGER_VH = 0.35;
  let maxProgress = 0;

  function update() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const startAt = vh * (1 - START_TRIGGER_VH);
    const endAt = Math.min(0, vh - rect.height);
    const distance = Math.max(1, startAt - endAt);
    let progress = (startAt - rect.top) / distance;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    if (progress > maxProgress) maxProgress = progress;
    const drawn = totalLength * maxProgress;
    path.style.strokeDashoffset = String(totalLength - drawn);
    events.forEach((ev, i) => {
      ev.style.opacity = drawn >= eventLengths[i] ? '1' : '0';
    });
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
