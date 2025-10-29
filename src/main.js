/**
 * @file src/main.js
 * @description Main entry point for the Cards and Gallery modules.
 *
 * This file imports global styles and re-exports the primary UI components:
 * - {@link Cards} – Renders a list of cards from JSON data.
 * - {@link Gallery} – Renders an image gallery with lightbox support.
 *
 * Usage:
 * ```js
 * import { Cards, Gallery } from './path/to/module'
 *
 * const cards = new Cards('#cards')
 * await cards.fetch('/data/cards.json')
 * cards.render()
 *
 * const gallery = new Gallery('#gallery')
 * await gallery.fetch('/data/gallery.json')
 * gallery.render()
 * ```
 */

import { staggerOnView, fadeOnView } from './helpers'
import Gallery from './gallery'
import Cards from './cards'
import './style.scss'

// Re-export as named exports for modular use
export { Cards, Gallery, staggerOnView, fadeOnView }
