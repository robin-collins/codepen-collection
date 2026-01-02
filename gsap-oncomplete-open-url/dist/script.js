gsap.to(".box", {
  duration: 1, rotation:360, y:100, stagger: 0.5,
  onComplete: () => window.open("https://google.com", '_blank'),
});

//The stagger amount (0.5) controls the amount of time between the start of each tween. Change it to 0.2, 1 or 3 to see how it works.