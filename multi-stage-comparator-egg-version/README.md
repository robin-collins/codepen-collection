# Multi-Stage Comparator [Egg Version]

A Pen created on CodePen.

Original URL: [https://codepen.io/luis-lessrain/pen/RNaLdgO](https://codepen.io/luis-lessrain/pen/RNaLdgO).

A multi-stage image comparator driven by scroll position using CSS scroll-timeline and animation-range. The system uses sibling-index() and sibling-count() to calculate layer timing and stacking order automatically - add or remove image layers and the CSS recalculates z-index, clip-path windows, and divider synchronization without manual class numbering.

The percentage counter is calculated in CSS using @property with scroll-driven animations. JavaScript handles section offset measurement, percentage display formatting, velocity-based wheel and touchpad smoothing, and interactive stage navigation with click-to-jump indicators. 