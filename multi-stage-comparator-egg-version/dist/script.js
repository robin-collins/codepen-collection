(function () {
  "use strict";
  let velocity = 0;
  const ease = 0.12;
  const friction = 0.92;
  const sections = document.querySelectorAll(".scroll-section");
  const sectionsLen = sections.length;
  const wrappers = [];
  const comparatorData = [];
  let i, s, w, c, p;

  for (i = 0; i < sectionsLen; i++) {
    s = sections[i];
    w = s.querySelector(".comparator-wrapper");
    if (w) wrappers.push({ section: s, wrapper: w });
    c = s.querySelector(".comparator");
    if (!c) continue;
    p = c.querySelector(".comparison-percentage");
    if (p) {
      const layers = c.querySelectorAll(".image-layer");
      comparatorData.push({
        comp: c,
        pct: p,
        section: s,
        layerCount: layers.length,
        wrapper: w
      });
    }
  }

  const wrappersLen = wrappers.length;
  const compLen = comparatorData.length;
  let d, v;

  function createStageIndicators() {
    for (i = 0; i < compLen; i++) {
      d = comparatorData[i];
      const nav = document.createElement("div");
      nav.className = "stage-nav";

      const indicators = [];
      for (let j = 0; j < d.layerCount; j++) {
        const indicator = document.createElement("button");
        indicator.className = "stage-indicator";
        indicator.setAttribute("aria-label", `Go to stage ${j + 1}`);
        indicator.dataset.stage = j;
        indicator.dataset.comparatorIndex = i;
        indicators.push(indicator);
        nav.appendChild(indicator);
      }

      d.comp.appendChild(nav);
      d.indicators = indicators;
    }
  }

  function getComparatorDuration() {
    const style = getComputedStyle(document.documentElement);
    const duration = style.getPropertyValue("--comparator-duration").trim();
    return (parseFloat(duration) * window.innerHeight) / 100;
  }

  let targetScrollPosition = null;
  const scrollEase = 0.08;

  function scrollToStage(comparatorIndex, stageIndex) {
    const data = comparatorData[comparatorIndex];
    if (!data) return;

    const offset = data.section.offsetTop;
    const duration = getComparatorDuration();
    const stageCount = data.layerCount;

    stageIndex = Math.max(0, Math.min(stageIndex, stageCount - 1));

    const stageDuration = duration / (stageCount - 1);
    targetScrollPosition = offset + stageDuration * stageIndex;
  }

  function onIndicatorClick(e) {
    const btn = e.target.closest(".stage-indicator");
    if (!btn) return;

    const stage = parseInt(btn.dataset.stage, 10);
    const compIndex = parseInt(btn.dataset.comparatorIndex, 10);

    scrollToStage(compIndex, stage);
  }

  function updateOffsets() {
    for (i = 0; i < wrappersLen; i++) {
      w = wrappers[i];
      w.wrapper.style.setProperty(
        "--comparator-offset",
        w.section.offsetTop + "px"
      );
    }
  }

  function onWheel(e) {
    e.preventDefault();
    targetScrollPosition = null;
    velocity += e.deltaY;
  }

  let resizeTimeout;

  function onResize() {
    targetScrollPosition = null;

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateOffsets();
    }, 150);
  }

  function onMouseDown(e) {
    if (!e.target.closest(".comparator-wrapper")) {
      targetScrollPosition = null;
    }
  }

  function frame() {
    if (targetScrollPosition !== null) {
      const current = window.scrollY;
      const delta = targetScrollPosition - current;

      if (Math.abs(delta) > 1) {
        window.scrollBy(0, delta * scrollEase);
      } else {
        targetScrollPosition = null;
      }
    }

    velocity *= friction;
    if (velocity > 0.2 || velocity < -0.2) {
      window.scrollBy(0, velocity * ease);
    }

    for (i = 0; i < compLen; i++) {
      d = comparatorData[i];
      v =
        parseFloat(
          getComputedStyle(d.comp).getPropertyValue("--scroll-progress")
        ) || 0;
      d.pct.textContent = (Math.round(v) + "").padStart(2, "0") + "%";

      const currentStage = Math.round((v / 100) * (d.layerCount - 1));
      d.indicators.forEach((indicator, idx) => {
        indicator.classList.toggle("active", idx === currentStage);
      });
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("mousedown", onMouseDown, { passive: true });
  document.addEventListener("click", onIndicatorClick);

  window.addEventListener("load", () => {
    createStageIndicators();
    updateOffsets();
    requestAnimationFrame(frame);
  });
})();