# Giselle Llamas - Pixel Art & Illustration Portfolio

This repository contains the source code for the personal portfolio website of Giselle Llamas, a multimedia artist and illustrator. The site is a fully custom, responsive single-page application (SPA)-style website built with a focus on a unique retro/pixel-art aesthetic.

---

## About The Project

This portfolio was designed and developed from the ground up to serve as a digital gallery for professional and personal artwork. It avoids templates and website builders in favor of clean, semantic HTML, modern CSS, and efficient vanilla JavaScript. The goal was to create a lightweight, fast, and visually engaging experience that reflects the artist's style.


## Key Features

*   **Fully Responsive:** Custom CSS and media queries ensure a seamless experience on all devices, from large desktops down to small mobile screens.
*   **Interactive Parallax Hero:** The homepage features a multi-layered hero section with a parallax scroll effect driven by vanilla JavaScript for a sense of depth.
*   **Pure JS Interactivity:**
    *   **Image Gallery Lightbox:** A custom-built, lightweight image viewer with fade transitions, keyboard navigation, and mobile swipe support.
    *   **"Retro Memorias" Game:** An interactive memory matching game (Memotest) with 1 and 2-player modes, built entirely in JavaScript.
    *   **Dynamic Elements:** The copyright year in the footer is dynamically updated via JavaScript.
*   **Performance Optimized:**
    *   **Lazy Loading:** Images outside the initial viewport are lazy-loaded to improve initial page speed.
    *   **Image Protection:** Basic client-side protection to discourage drag-and-drop and right-click saving of artwork.
    *   **Minimal Dependencies:** Relies primarily on vanilla JavaScript, with jQuery used for specific legacy functions.
*   **Accessible Design:**
    *   Semantic HTML5 structure (`<nav>`, `<main>`, `<article>`, etc.).
    *   ARIA attributes used for accessibility in navigation (hamburger menu) and interactive components.

## Built With

This project is built with core web technologies, keeping it lightweight and maintainable.

*   **HTML5**
*   **CSS3**
    *   Pure.css (for base styles and forms)
    *   Flexbox & CSS Grid
    *   Custom Properties (Variables)
*   **JavaScript (ES6+)**
    *   The majority of the site's logic, including the gallery, game, and parallax effects, is written in modern, dependency-free JavaScript.
*   **jQuery 3.4.1**
    *   Used for some DOM manipulation and legacy functions (no longer used in the current iteration of the site).


## Getting Started

This is a static website. No build process or installation is required.

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/shining-monster-pixelart-portfolio.git
    ```
2.  Open the `index.html` file in your web browser.

### Contact Form

The contact form in `bio/contacto.html` is a front-end implementation only. For it to send emails, it would require a backend service or a third-party solution (like Formspree, Netlify Forms, etc.). It is currently configured for static deployment and will show a success message without actually sending data.

## File Structure

The project is organized to separate content types and maintain clarity.

```
shining-monster-pixelart-portfolio/
├── bio/               # Bio and Contact pages
├── blog/              # Blog articles
├── css/               # Stylesheets (base, main, responsive)
├── cv/                # CV, Exhibitions, and Testimonials pages
├── img/               # Global and homepage images
├── ilustracion/       # Illustration gallery page
├── juego/             # Memotest game page
├── js/                # JavaScript files (core functions, contact form logic)
├── proyectos/         # Individual project detail pages
├── index.html         # Homepage
└── robots.txt         # Search engine crawler directives
```

---

## Author

*   **Giselle Llamas** - *Design & Development*
    *   Behance - www.behance.net/ShiningMonster
