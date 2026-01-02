gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

let currentControlPoints = null;
let positions = null;
let draggingPoint = null;
let pathVisible = true;

function initInteractivePath() {
  const section = document.querySelector('[data-section="hero"]');
  const pos1 = document.querySelector('[data-pos="1"]');
  const pos2 = document.querySelector('[data-pos="2"]');
  const pos3 = document.querySelector('[data-pos="3"]');
  const img = document.querySelector('[data-image="animated"]');

  if (!section || !pos1 || !pos2 || !pos3 || !img) {
    console.error('Missing required elements');
    return;
  }

  // Setup
  if (getComputedStyle(section).position === 'static') {
    section.style.position = 'relative';
  }

  if (img.parentNode !== section) {
    img.parentNode.removeChild(img);
    section.appendChild(img);
  }

  img.style.position = 'absolute';
  img.style.zIndex = '10';
  img.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  gsap.set(img, { transformOrigin: '50% 50%', xPercent: -50, yPercent: -50 });

  // Create debug SVG
  let debugSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  debugSvg.style.position = 'absolute';
  debugSvg.style.top = 0;
  debugSvg.style.left = 0;
  debugSvg.style.width = '100%';
  debugSvg.style.height = '100%';
  debugSvg.style.pointerEvents = 'none';
  debugSvg.style.zIndex = 15; // Above the image (which is z-index 10)
  section.appendChild(debugSvg);

  let debugPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  debugPath.setAttribute('stroke', '#ff0040');
  debugPath.setAttribute('stroke-width', '3');
  debugPath.setAttribute('fill', 'none');
  debugPath.setAttribute('opacity', '0.8');
  debugSvg.appendChild(debugPath);

  const controlPointElements = [];
  const handleLines = [];
  const anchorPoints = [];

  // Create anchor point markers
  for (let i = 0; i < 3; i++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '8');
    circle.setAttribute('fill', '#ff0040');
    circle.setAttribute('stroke', '#ffffff');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('opacity', '0.9');
    debugSvg.appendChild(circle);
    anchorPoints.push(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('fill', '#ff0040');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-weight', 'bold');
    text.textContent = `P${i + 1}`;
    debugSvg.appendChild(text);
    anchorPoints.push(text);
  }

  // Create handle lines
  for (let i = 0; i < 4; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('stroke', '#00ff88');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-dasharray', '4,4');
    line.setAttribute('opacity', '0.5');
    debugSvg.appendChild(line);
    handleLines.push(line);
  }

  // Create draggable control points
  for (let i = 0; i < 4; i++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '8');
    circle.setAttribute('fill', '#00ff88');
    circle.setAttribute('stroke', '#ffffff');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('opacity', '0.9');
    circle.setAttribute('class', 'svg-control-point');
    circle.style.pointerEvents = 'all';
    circle.dataset.index = i;
    debugSvg.appendChild(circle);
    controlPointElements.push(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('fill', '#00ff88');
    text.setAttribute('font-size', '12');
    text.setAttribute('font-weight', 'bold');
    text.textContent = `CP${i + 1}`;
    text.style.pointerEvents = 'none';
    debugSvg.appendChild(text);
    controlPointElements.push(text);
  }

  // Get positions relative to section
  function getPositions() {
    const rectSection = section.getBoundingClientRect();
    return [pos1, pos2, pos3].map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left - rectSection.left + r.width / 2,
        y: r.top - rectSection.top + r.height / 2,
        width: r.width,
        height: r.height,
      };
    });
  }

  // Calculate default control points
  function calculateDefaultControlPoints(positions) {
    return [
      {
        x: positions[0].x,
        y: positions[0].y + (positions[1].y - positions[0].y) * 0.8,
      },
      {
        x: positions[1].x,
        y: positions[1].y - Math.min(800, (positions[1].y - positions[0].y) * 0.3),
      },
      {
        x: positions[1].x,
        y: positions[1].y + Math.min(80, (positions[2].y - positions[1].y) * 0.3),
      },
      {
        x: positions[1].x + (positions[2].x - positions[1].x) * 0.6,
        y: positions[2].y - (positions[2].y - positions[1].y) * 0.2,
      }
    ];
  }

  let tl;

  function buildAnimation() {
    if (tl) tl.kill();

    positions = getPositions();

    // Initialize control points if not set
    if (!currentControlPoints) {
      currentControlPoints = calculateDefaultControlPoints(positions);
    }

    // Set initial position and size
    gsap.set(img, {
      x: positions[0].x,
      y: positions[0].y,
      width: positions[0].width,
      height: positions[0].height,
    });

    updateVisualization();

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Rebuild path if needed during scroll
        }
      },
    });

    const pathString = buildPathString();

    // Animate along path
    tl.to(img, {
      duration: 1.5,
      motionPath: {
        path: pathString,
        autoRotate: false,
      },
      ease: 'none',
      onUpdate: function () {
        const progress = this.progress();

        if (progress <= 0.5) {
          const normalizedProgress = progress * 2;
          const width = positions[0].width + (positions[1].width - positions[0].width) * normalizedProgress;
          const height = positions[0].height + (positions[1].height - positions[0].height) * normalizedProgress;
          img.style.width = `${width}px`;
          img.style.height = `${height}px`;
        } else {
          const normalizedProgress = (progress - 0.5) * 2;
          const width = positions[1].width + (positions[2].width - positions[1].width) * normalizedProgress;
          const height = positions[1].height + (positions[2].height - positions[1].height) * normalizedProgress;
          img.style.width = `${width}px`;
          img.style.height = `${height}px`;
        }
      },
    });
  }

  function buildPathString() {
    return `M${positions[0].x},${positions[0].y} ` +
      `C${currentControlPoints[0].x},${currentControlPoints[0].y} ${currentControlPoints[1].x},${currentControlPoints[1].y} ${positions[1].x},${positions[1].y} ` +
      `C${currentControlPoints[2].x},${currentControlPoints[2].y} ${currentControlPoints[3].x},${currentControlPoints[3].y} ${positions[2].x},${positions[2].y}`;
  }

  function updateVisualization() {
    const pathString = buildPathString();
    debugPath.setAttribute('d', pathString);

    // Update anchor points
    positions.forEach((pos, i) => {
      const circle = anchorPoints[i * 2];
      const text = anchorPoints[i * 2 + 1];
      circle.setAttribute('cx', pos.x);
      circle.setAttribute('cy', pos.y);
      text.setAttribute('x', pos.x + 12);
      text.setAttribute('y', pos.y - 12);
    });

    // Update control points
    currentControlPoints.forEach((cp, i) => {
      const circle = controlPointElements[i * 2];
      const text = controlPointElements[i * 2 + 1];
      circle.setAttribute('cx', cp.x);
      circle.setAttribute('cy', cp.y);
      text.setAttribute('x', cp.x + 12);
      text.setAttribute('y', cp.y - 12);
    });

    // Update handle lines
    handleLines[0].setAttribute('x1', positions[0].x);
    handleLines[0].setAttribute('y1', positions[0].y);
    handleLines[0].setAttribute('x2', currentControlPoints[0].x);
    handleLines[0].setAttribute('y2', currentControlPoints[0].y);

    handleLines[1].setAttribute('x1', positions[1].x);
    handleLines[1].setAttribute('y1', positions[1].y);
    handleLines[1].setAttribute('x2', currentControlPoints[1].x);
    handleLines[1].setAttribute('y2', currentControlPoints[1].y);

    handleLines[2].setAttribute('x1', positions[1].x);
    handleLines[2].setAttribute('y1', positions[1].y);
    handleLines[2].setAttribute('x2', currentControlPoints[2].x);
    handleLines[2].setAttribute('y2', currentControlPoints[2].y);

    handleLines[3].setAttribute('x1', positions[2].x);
    handleLines[3].setAttribute('y1', positions[2].y);
    handleLines[3].setAttribute('x2', currentControlPoints[3].x);
    handleLines[3].setAttribute('y2', currentControlPoints[3].y);

    updateValuesDisplay();
  }

  function updateValuesDisplay() {
    const valuesDiv = document.getElementById('values');
    const rectSection = section.getBoundingClientRect();

    let html = '';
    currentControlPoints.forEach((cp, i) => {
      const relativeY = positions[i < 2 ? 0 : (i < 3 ? 1 : 2)].y;
      const relativeX = positions[i < 2 ? 0 : (i < 3 ? 1 : 2)].x;

      html += `<div class="cp-group">`;
      html += `<span class="cp-label">CP${i + 1}:</span><br>`;
      html += `<span class="cp-value">x: ${Math.round(cp.x)}, y: ${Math.round(cp.y)}</span>`;
      html += `</div>`;
    });

    valuesDiv.innerHTML = html;
  }

  // Dragging functionality
  let isDragging = false;
  let currentDragIndex = -1;

  function startDrag(e) {
    const target = e.target;
    if (target.classList.contains('svg-control-point')) {
      isDragging = true;
      currentDragIndex = parseInt(target.dataset.index);
      target.classList.add('dragging');
      e.preventDefault();
    }
  }

  function drag(e) {
    if (!isDragging || currentDragIndex === -1) return;

    const rectSection = section.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const newX = clientX - rectSection.left;
    const newY = clientY - rectSection.top;

    currentControlPoints[currentDragIndex] = { x: newX, y: newY };

    updateVisualization();

    // Rebuild animation with new control points
    if (tl) {
      const progress = tl.scrollTrigger.progress;
      tl.kill();
      buildAnimation();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.scroll(tl.scrollTrigger.start + (tl.scrollTrigger.end - tl.scrollTrigger.start) * progress);
      }
    }
  }

  function endDrag(e) {
    if (isDragging) {
      const circles = debugSvg.querySelectorAll('.svg-control-point');
      circles.forEach(c => c.classList.remove('dragging'));
      isDragging = false;
      currentDragIndex = -1;
    }
  }

  // Event listeners for dragging
  debugSvg.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);

  debugSvg.addEventListener('touchstart', startDrag);
  document.addEventListener('touchmove', drag);
  document.addEventListener('touchend', endDrag);

  buildAnimation();

  // Rebuild on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      positions = getPositions();
      updateVisualization();
      buildAnimation();
    }, 200);
  });

  return {
    reset: () => {
      currentControlPoints = calculateDefaultControlPoints(positions);
      updateVisualization();
      buildAnimation();
    },
    togglePath: () => {
      pathVisible = !pathVisible;
      debugSvg.style.display = pathVisible ? 'block' : 'none';
    }
  };
}

// Initialize
const controller = initInteractivePath();

// Global functions for buttons
function copyValues() {
  const valuesText = currentControlPoints.map((cp, i) => 
                                              `const controlPoint${i + 1} = {\n  x: ${Math.round(cp.x)},\n  y: ${Math.round(cp.y)}\n};`
                                             ).join('\n\n');

  navigator.clipboard.writeText(valuesText).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  });
}

function resetToDefault() {
  controller.reset();
}

function togglePath() {
  controller.togglePath();
}

function togglePanel() {
  const panel = document.getElementById('controlPanel');
  const btn = document.getElementById('toggleBtn');

  panel.classList.toggle('minimized');

  if (panel.classList.contains('minimized')) {
    btn.textContent = '+';
  } else {
    btn.textContent = '−';
  }
}

// Keyboard shortcut: Press 'H' to hide/show panel
document.addEventListener('keydown', (e) => {
  if (e.key === 'h' || e.key === 'H') {
    togglePanel();
  }
});

// Click anywhere on minimized panel to expand
document.getElementById('controlPanel').addEventListener('click', (e) => {
  const panel = document.getElementById('controlPanel');
  const btn = document.getElementById('toggleBtn');

  // Only expand if panel is minimized and click wasn't on a button inside
  if (panel.classList.contains('minimized') && e.target !== btn) {
    togglePanel();
  }
});