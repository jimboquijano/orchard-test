/**
 * @file src/gallery.js
 * @description Handles rendering of an image gallery with associated content and a Lightbox viewer.
 */

import { Lightbox } from './lightbox.js'
import { truncateByWords } from './helpers.js'

export default class Gallery {
  /**
   * @param {string} container - CSS selector for the gallery container.
   */
  constructor(container) {
    this.imagesContainer = document.querySelector(`${container} .images`)
    this.contentContainer = document.querySelector(`${container} .content`)

    this.imagesTemplateFn = null
    this.contentTemplateFn = null

    this.lightbox = new Lightbox()
    this.galleryData = null
  }

  /**
   * Fetch gallery data (images and content) from a JSON endpoint.
   * @param {string} url - The JSON endpoint URL.
   * @returns {Promise<Object>} - Resolves with the JSON object.
   */
  fetch(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.galleryData = data
        return data
      })
      .catch((err) => {
        console.error('Error fetching gallery data:', err)
        return null
      })
  }

  /**
   * Render the gallery images and content.
   * Automatically binds lightbox events after rendering.
   * @param {Object} [data] - Optional data to render directly.
   * @returns {Gallery} Returns the instance for chaining.
   */
  render(data) {
    const gallery = data || this.galleryData
    if (!gallery) return this

    // Reset image container
    this.imagesContainer.innerHTML = ''
    const images = []

    // Render all images
    gallery.images.forEach((image) => {
      const html = this._getImagesTemplate(image)
      this.imagesContainer.insertAdjacentHTML('beforeend', html)
      images.push(this.imagesContainer.lastElementChild)
    })

    // Render associated textual content
    this.contentContainer.innerHTML = this._getContentTemplate(gallery.content)

    // Initialize lightbox functionality
    this.lightbox.init(images)

    return this
  }

  /**
   * Provide a custom template for image rendering.
   * @param {(image: object) => string} fn - Function returning HTML for an image.
   * @returns {Gallery} Returns the instance for chaining.
   */
  useImageTemplate(fn) {
    if (typeof fn === 'function') {
      this.imagesTemplateFn = fn
    }
    return this
  }

  /**
   * Provide a custom template for content rendering.
   * @param {(content: object) => string} fn - Function returning HTML for the content section.
   * @returns {Gallery} Returns the instance for chaining.
   */
  useContentTemplate(fn) {
    if (typeof fn === 'function') {
      this.contentTemplateFn = fn
    }
    return this
  }

  /**
   * Internal: Generate HTML for a single image.
   * @param {object} image - Image data object.
   * @returns {string} HTML string for an image element.
   * @private
   */
  _getImagesTemplate(image) {
    let template = `
	  <a href="${image.large}">
        <img src="${image.src}" alt="${image.alt}" />
	  </a>
    `

    if (this.imagesTemplateFn) {
      template = this.imagesTemplateFn(image)
    }

    return template
  }

  /**
   * Internal: Generate HTML for the gallery content section.
   * @param {object} content - Gallery content data object.
   * @returns {string} HTML string for the content section.
   * @private
   */
  _getContentTemplate(content) {
    let paragraphs = content.paragraphs.map((p) => `<p>${p}</p>`).join('')
    paragraphs = truncateByWords(paragraphs)

    let template = `
      <h1>${content.title}</h1>${paragraphs}
      <h3><em>${content.highlight.title}</em></h3>
      <p><strong>${content.highlight.text}</strong></p>
    `

    if (this.contentTemplateFn) {
      template = this.contentTemplateFn(content)
    }

    return template
  }
}
