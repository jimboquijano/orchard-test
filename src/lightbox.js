/**
 * @file src/lightbox.js
 * @description Provides an accessible, keyboard-navigable lightbox viewer for image galleries.
 */

export class Lightbox {
  constructor() {
    this.lightbox = null
    this.lightboxImg = null
    this.closeBtn = null
    this.prevBtn = null
    this.nextBtn = null
    this.items = []
    this.currentIndex = 0
  }

  /**
   * Initialize the lightbox with clickable image elements.
   * @param {HTMLElement[]} items - Array of image elements.
   */
  init(items) {
    this.items = items
    this.currentIndex = 0
    this._createLightbox()
    this._bindEvents()
  }

  /**
   * Open the lightbox for the current image index.
   */
  open() {
    const link = this.items[this.currentIndex]
    const img = link.querySelector('img')
    this.lightboxImg.src = link.getAttribute('href')
    this.lightboxImg.alt = img?.alt || ''
    this.lightbox.setAttribute('aria-hidden', 'false')
  }

  /**
   * Close the lightbox.
   */
  close() {
    this.lightbox.setAttribute('aria-hidden', 'true')
  }

  /**
   * Show the next image.
   * Wraps around when reaching the end.
   */
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length
    this.open()
  }

  /**
   * Show the previous image.
   * Wraps around when reaching the start.
   */
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length
    this.open()
  }

  /**
   * Internal: Create the lightbox DOM structure.
   * Only creates it once per page.
   * @private
   */
  _createLightbox() {
    if (!this.lightbox) {
      this.lightbox = document.createElement('div')
      this.lightbox.className = 'lightbox'
      this.lightbox.setAttribute('aria-hidden', 'true')
      this.lightbox.innerHTML = `
        <span class="lightbox-close" aria-label="Close">&times;</span>
        <img class="lightbox-img" src="" alt="" />
        <div class="lightbox-controls">
          <button class="prev" aria-label="Previous Image">&#10094;</button>
          <button class="next" aria-label="Next Image">&#10095;</button>
        </div>
      `
      document.body.appendChild(this.lightbox)
      this.lightboxImg = this.lightbox.querySelector('.lightbox-img')
      this.closeBtn = this.lightbox.querySelector('.lightbox-close')
      this.prevBtn = this.lightbox.querySelector('.prev')
      this.nextBtn = this.lightbox.querySelector('.next')
    }
  }

  /**
   * Internal: Bind all UI and keyboard event listeners.
   * @private
   */
  _bindEvents() {
    // Click on thumbnails to open lightbox
    this.items.forEach((el, index) => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        this.currentIndex = index
        this.open()
      })
    })

    // Close button and backdrop click
    this.closeBtn.addEventListener('click', () => this.close())
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.close()
    })

    // Navigation buttons
    this.prevBtn.addEventListener('click', () => this.prev())
    this.nextBtn.addEventListener('click', () => this.next())

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.lightbox.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'ArrowLeft') this.prev()
        if (e.key === 'ArrowRight') this.next()
        if (e.key === 'Escape') this.close()
      }
    })
  }
}
