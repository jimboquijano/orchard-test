# Orchard Interface Development Test

This project is a **front-end interface development test** for **Orchard**, implemented using **vanilla JavaScript (ES Modules)** and modern browser APIs. It demonstrates clean component-based architecture, reusable UI modules, and basic viewport-triggered animations without external frameworks.

More importantly, this showcases how one perfectly implements a project from start to production. More detailed walkthrough and explanation will be sent through the email talking about the choosen tools, architecture, coding philosophy, design choices and more.

---

## 📁 Project Structure

/
├── index.html # Main HTML entry point  
├── src/  
│ ├── main.js # Entry module re-exporting components  
│ ├── cards.js # Cards component – renders a card grid from JSON  
│ ├── gallery.js # Gallery component – image gallery with lightbox  
│ ├── lightbox.js # Accessible image viewer with keyboard support  
│ ├── helpers.js # Shared utility functions (animations, truncation)  
│ └── style.scss # Global SCSS styles

---

## ⚙️ Features

- **Cards Component (`Cards`)**
  - Fetches and renders cards with title, image, and description.
  - Supports custom item and content templates.
  - Emits a structured object (`{ image, title, description }`) on click.

- **Gallery Component (`Gallery`)**
  - Fetches and renders gallery images and associated text.
  - Integrates with an accessible **Lightbox** viewer.
  - Supports custom templates for flexible markup generation.

- **Lightbox Utility**
  - Keyboard-navigable (`←`, `→`, `Esc`).
  - Click and button controls for next/prev/close.
  - Fully accessible with ARIA attributes.

- **Animation Helpers**
  - `fadeOnView()` – applies a smooth fade-in animation on visibility.
  - `staggerOnView()` – applies staggered entrance animations.
  - Both use `IntersectionObserver` for efficient viewport detection.

---

## 🚀 Dev Usage (For Orchard to TRY)

1. Open terminal and start the main app.

```
npm run dev
```

2. All set! You can now open the app.

---

## 🧩 Example Integration

```js
import { Cards, Gallery, staggerOnView, fadeOnView } from './src/main'

const cards = new Cards('.cards-section')

cards.fetch('/api/cards').then((data) => {
  cards.render(data)
  staggerOnView(document.querySelectorAll('.card'))
})

const gallery = new Gallery('.gallery-section')
gallery.fetch('/api/gallery').then((data) => {
  gallery.render(data)
  fadeOnView(document.querySelectorAll('.gallery-section .content'))
})
```

---

## 🧪 Running Tests

This project uses **Vitest** for testing, running inside a **jsdom** environment to simulate the browser. Test coverage includes the following:

- Component behavior (`Cards`, `Gallery`, `Lightbox`)
- Helper utilities (`truncateByWords`, `staggerOnView`, `fadeOnView`)
- DOM rendering and event bindings using **jsdom**

Run all tests:

```bash
npm run test

```

Run a specific test file:

```bash
npm run test -- tests/cards.test.js

```

---

## 👤 Author

**Jimbo Quijano**  
Front-End Engineer · 2025

───────────────────────────────────────────────
