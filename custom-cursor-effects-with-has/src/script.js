const delay = 5;

  let posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

  const mouseDelay = () => {
    posX += (mouseX - posX) / delay;
    posY += (mouseY - posY) / delay;

    document.documentElement.style.setProperty("--mx", posX + "px");
    document.documentElement.style.setProperty("--my", posY + "px");

    requestAnimationFrame(mouseDelay);
  };

  mouseDelay();

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });