gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 1,
  effects: true,
  normalizeScroll: true
});

const cards = gsap.utils.toArray(".stacking__card");
const spacer = 50;

cards.forEach((card, index) => {
  ScrollTrigger.create({
    trigger: card,
    start: `center-=${index * spacer} center`,
    endTrigger: ".stacking",
    end: `bottom center`,
    pin: true,
    pinSpacing: false,
    // markers: true,
    invalidateOnRefresh: true
  });

  const scaleValue = 0.85 + index * 0.05;
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: `top center`,
      end: `bottom center`,
      scrub: true,
      // markers: true,
      invalidateOnRefresh: true
    },
    // ease: "none",
    scale: scaleValue
  });
});
