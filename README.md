# Premium CodePen Collection

A curated collection of high-end design concepts, animations, and technical demonstrations. This repository serves as a catalog for 32 distinct interactive experiments, ranging from pure CSS layouts to advanced GLSL shader demos.

## 🚀 Overview

This collection showcases modern web capabilities including:
- **Animations**: GSAP, ScrollTrigger, Anime.js, and CSS Transitions.
- **3D & Graphics**: Three.js, GLSL, and SVG Filters.
- **Modern CSS**: Scroll-driven Animations, `:has()` selector, `@property`, and Container Queries.
- **API Integration**: Dynamic Unsplash galleries and interactive dashboard concepts.

---

## 🗂️ Project Catalog

## 1. Animated User Profile Cards - pure CSS
- **Description**: A set of interactive user profile cards that expand to reveal more details and an image gallery upon selection. It utilizes the checkbox/radio hack for state management, making it fully functional without JavaScript.
- **Technologies**: HTML, CSS (Variables, `:has` selector, Grid, Flexbox).
- **Key Features**: Smooth transitions, expanding cards, radio-button based state, responsive gallery.
- **Path**: [animated-user-profile-cardspure-css](./animated-user-profile-cardspure-css)

## 2. Bouncy Notification with Animated Radius
- **Description**: A dynamic notification component featuring a playful, bouncy animation effect. It simulates fluid motion using spring physics for the border radius and dimensions.
- **Technologies**: HTML, JavaScript (Anime.js), CSS (Tailwind CSS, Custom Utilities).
- **Key Features**: Spring physics animations (height, opacity, border-radius), SVG filters for "gooey" effect, Tailwind utility classes for complex shapes.
- **Path**: [bouncy-notification-with-animated-radius](./bouncy-notification-with-animated-radius)

## 3. Card Beam Animation
- **Description**: A sophisticated visual demo featuring an interactive, infinite-scrolling stream of credit cards with a "scanning" beam effect. It combines 2D DOM elements with a 3D Three.js particle background.
- **Technologies**: Three.js, Vanilla JavaScript (Classes, Canvas API), CSS (CSS Variables, Clip-path, Animations).
- **Key Features**: Infinite card stream, draggable interface, particle beam scanner, Three.js particle background.
- **Path**: [card-beam-animation](./card-beam-animation)

## 4. Chrome: CSS Scroll Based Animations
- **Description**: A showcase of modern CSS Scroll-driven Animations API. It demonstrates complex scroll interactions without JavaScript logic (excluding polyfills). 
- **Technologies**: CSS (Scroll-driven Animations API: `scroll()`, `view()`, `@property`), Open Props.
- **Key Features**: 3D transforms driven by scroll, radial progress bars, shape morphing.
- **Path**: [chrome-css-scroll-based-animations](./chrome-css-scroll-based-animations)

## 5. Custom cursor effects with :has()
- **Description**: Demonstrates how to create a context-aware custom cursor using only CSS `:has()` and a tiny bit of JS for mouse tracking. The cursor changes depending on the hovered element.
- **Technologies**: CSS (`:has()` pseudo-class, CSS Variables), tiny JS snippet.
- **Key Features**: Context-dependent cursor styles, smooth scale/opacity transitions, multiple interaction modes.
- **Path**: [custom-cursor-effects-with-has](./custom-cursor-effects-with-has)

## 6. Disintegration Effect | GSAP ScrollTrigger
- **Description**: A stunning interactive effect where an image appears to disintegrate into particles (pixels) as the user scrolls.
- **Technologies**: JavaScript (GSAP ScrollTrigger, HTML2Canvas), Canvas API.
- **Key Features**: Scroll-driven pixel dispersion, dynamic canvas generation.
- **Path**: [disintegration-gsap-scrolltrigger-demo](./disintegration-gsap-scrolltrigger-demo)

## 7. Frosted + Saturated Borders
- **Description**: A premium UI component featuring a "frosted glass" aesthetic with high-saturation borders.
- **Technologies**: CSS (`backdrop-filter`, `color-mix`, `@layer`, `oklch`).
- **Key Features**: High-quality glassmorphism, sticky sidebar, responsive product card.
- **Path**: [frosted-saturated-borders](./frosted-saturated-borders)

## 8. GSAP MorphSVG Curve Manipulation
- **Description**: A demonstration of GSAP's MorphSVGPlugin, animating simple SVG paths into complex curves.
- **Technologies**: JavaScript (GSAP MorphSVGPlugin), SVG.
- **Key Features**: Smooth vector path morphing, timeline controls.
- **Path**: [gsap-morphsvg-curve-manipulation](./gsap-morphsvg-curve-manipulation)

## 9. GSAP onComplete Open URL
- **Description**: A functional demo showing how to trigger external actions (like opening a URL) after a GSAP sequence completes.
- **Technologies**: JavaScript (GSAP TweenMax).
- **Key Features**: Animation callbacks (`onComplete`), staggered element animation.
- **Path**: [gsap-oncomplete-open-url](./gsap-oncomplete-open-url)

## 10. Horizontal Scroll with GSAP
- **Description**: Implements a horizontal scrolling section within a vertical page flow using GSAP and pinning.
- **Technologies**: JavaScript (GSAP, ScrollMagic).
- **Key Features**: Scroll-jacking (horizontal movement mapped to vertical scroll), pinned sections.
- **Path**: [horizontal-scroll-with-gsap-and-scrollmagic](./horizontal-scroll-with-gsap-and-scrollmagic)

## 11. Image Pixelation w/ SVG
- **Description**: Creates a dynamic mosaic/pixelation effect on an image using SVG filters. Includes a 3D-perspective card effect.
- **Technologies**: SVG Filters (`feFlood`, `feTile`), CSS (3D Transforms).
- **Key Features**: Custom SVG filters, 3D rotating card interface.
- **Path**: [image-pixelation-w-svg](./image-pixelation-w-svg)

## 12. Interactive Liquid Gradient using Three.js
- **Description**: A highly immersive fluid background where users create ripples and distortion through mouse interaction.
- **Technologies**: Three.js, GLSL (Shaders).
- **Key Features**: Fragment shaders for fluid dynamics, real-time color scheme swapping.
- **Path**: [interactive-liquid-gradient-using-three-js](./interactive-liquid-gradient-using-three-js)

## 13. Multi-Stage Comparator [Egg Version]
- **Description**: A technical demonstration of modern CSS scroll capabilities for image comparison.
- **Technologies**: CSS (Scroll-driven Animations, `sibling-index()`, `@property`).
- **Key Features**: Pure CSS image comparison engine, automatic z-index layering.
- **Path**: [multi-stage-comparator-egg-version](./multi-stage-comparator-egg-version)

## 14. Paths & Control Points
- **Description**: An interactive tool for developers to experiment with and visualize GSAP motion paths in real-time.
- **Technologies**: JavaScript (GSAP MotionPathPlugin), SVG.
- **Key Features**: Draggable anchor and control points, coordinate output.
- **Path**: [paths-control-points](./paths-control-points)

## 15. In-View Detector
- **Description**: A lightweight and performant "in-view" element detector for triggering scroll entrance animations.
- **Technologies**: Vanilla JavaScript (`requestAnimationFrame`).
- **Key Features**: Low-latency scroll monitoring, simple class-toggle logic.
- **Path**: [pen-export-QEmmQz](./pen-export-QEmmQz)

## 16. Playing with Variable Fonts
- **Description**: An exploration of Variable Fonts (weight and width) smoothly animated via CSS `@property`.
- **Technologies**: CSS (Variable Fonts, `@property`), Merriweather Font.
- **Key Features**: Smooth animation of font axes, optimized performance.
- **Path**: [playing-with-variable-fonts](./playing-with-variable-fonts)

## 17. React Smooth Section Navigator
- **Description**: A high-performance full-page navigator with vertical "curtain" transitions.
- **Technologies**: React, GSAP (Observer).
- **Key Features**: URL-hash linking, responsive nested wrapper animations.
- **Path**: [react-smooth-section-navigator](./react-smooth-section-navigator)

## 18. RetroBeats Landing Page
- **Description**: A retro-music themed landing page blending vertical layouts with Swiper.js carousels.
- **Technologies**: GSAP, Swiper.js, IonIcons.
- **Key Features**: Coverflow sliders, custom scroll behaviors.
- **Path**: [responsive-landing-page-gsap-swiper](./responsive-landing-page-gsap-swiper)

## 19. Scroll Animation Deconstruction
- **Description**: A educational deconstruction of the Scroll-driven Animations API, featuring SVG path drawing.
- **Technologies**: CSS (Scroll-driven Animations API, `view()`).
- **Key Features**: Pure CSS scroll linking, viewport-based reveals.
- **Path**: [scroll-animation-deconstruction-with-scroll-animation-api](./scroll-animation-deconstruction-with-scroll-animation-api)

## 20. ScrollTrigger Hero Masking
- **Description**: A stunning hero reveal using a scaled SVG mask to disclose a vibrant gradient background.
- **Technologies**: GSAP ScrollTrigger, SVG Masking.
- **Key Features**: Complex element pinning and iris-reveal.
- **Path**: [scrolltrigger-hero-masking](./scrolltrigger-hero-masking)

## 21. Sidebar Nav Animation
- **Description**: A retractable vertical navigation bar with a smooth expansion effect and background masking.
- **Technologies**: CSS (Transitions, Transforms), SVG Icons.
- **Path**: [sidebar-nav-animation](./sidebar-nav-animation)

## 22. Slide-out Nav with Flip Effect
- **Description**: A premium fullscreen menu featuring "flip" link animations and background blur.
- **Technologies**: CSS (`@layer`, `:has()`), Container Queries.
- **Path**: [slide-out-nav-with-flip-effect](./slide-out-nav-with-flip-effect)

## 23. Stacking Card
- **Description**: Demonstrates a "stacked" scrolling effect where cards pin sequentially to the top.
- **Technologies**: GSAP, ScrollTrigger.
- **Path**: [stacking-card](./stacking-card)

## 24. Staggered Text Reveal
- **Description**: Words in a text block reveal themselves with a delay calculated entirely in CSS via `sibling-index()`.
- **Technologies**: CSS (`sibling-index()`, Animations).
- **Path**: [staggered-text-reveal-with-sibling-index](./staggered-text-reveal-with-sibling-index)

## 25. Sticky Window Scroller w/ 3D View
- **Description**: An interactive 3D layout experiment with a "parallax window" effect and a real-time configuration panel.
- **Technologies**: GSAP Draggable, Tweakpane.
- **Path**: [sticky-window-scroller-w-3d-view](./sticky-window-scroller-w-3d-view)

## 26. Text Frame Border Animation
- **Description**: An image frame with rotating text flowing along an irregular SVG blob path.
- **Technologies**: SVG (`textPath`, `clipPath`).
- **Path**: [text-frame-border-animation-rotation-that-css-svg-v-2](./text-frame-border-animation-rotation-that-css-svg-v-2)

## 27. Modern Text Gradient
- **Description**: Large typography showcase featuring high-impact multi-stop gradients.
- **Technologies**: CSS (`background-clip: text`).
- **Path**: [text-gradient](./text-gradient)

## 28. Timed Cards Opening (Travel Dashboard)
- **Description**: A premium Travel carousel with automated loops and complex entrance sequences.
- **Technologies**: GSAP Timeline.
- **Path**: [timed-cards-opening](./timed-cards-opening)

## 29. Metallic Rotating Button
- **Description**: Interactive metallic button effect using CSS `@property` for gradient rotation.
- **Technologies**: CSS (`@property`, `conic-gradient`).
- **Path**: [untitled](./untitled)

## 30. Unsplash API Grid Layout
- **Description**: Dynamic gallery fetching real-time photos from the Unsplash API into a responsive grid.
- **Technologies**: Fetch API, CSS Grid.
- **Path**: [use-unsplash-api-to-fill-css-grid-layout](./use-unsplash-api-to-fill-css-grid-layout)

## 31. Vertical Page Snap Scroller
- **Description**: Section-based layout with custom snap-scrolling and pagination status.
- **Technologies**: JavaScript (Debounce, `scrollTo`).
- **Path**: [vertical-page-snappure-js](./vertical-page-snappure-js)

## 32. Willem Loading Animation (Osmo)
- **Description**: Professional-grade loading sequence transitioning to a minimalist full-screen layout.
- **Technologies**: GSAP, Modern Typography.
- **Path**: [willem-loading-animationosmo](./willem-loading-animationosmo)

---

Developed and Cataloged with ❤️ by Antigravity.
