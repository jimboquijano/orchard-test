/**
 * @file src/cards.js
 * @description Renders a list of cards from fetched JSON data, optionally using a custom template.
 */

export default class Cards {
  /**
   * @param {string} container - CSS selector for the container element.
   */
  constructor(container) {
    this.itemsContainer = document.querySelector(`${container} .items`)
    this.contentContainer = document.querySelector(`${container} .content`)

    this.itemsTemplateFn = null
    this.contentTemplateFn = null
    this.clickHandler = null
    this.cardsData = []
  }

  /**
   * Fetch gallery data (items and content) from a JSON endpoint.
   * @param {string} url - The JSON endpoint URL.
   * @returns {Promise<Object>} - Resolves with the JSON object.
   */
  async fetch(url) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.cardsData = data
        return data
      })
      .catch((err) => {
        console.error('Error fetching cards data:', err)
        return null
      })
  }

  /**
   * Render all cards inside the container.
   * Clears existing content before rendering.
   * @param {Object[]} [data] - Optional data to render directly.
   * @returns {Cards} Returns the instance for chaining.
   */
  render(data) {
    const cards = data || this.cardsData
    if (!cards) return this

    // Reset items container
    this.itemsContainer.innerHTML = ''

    cards.items.forEach((item) => {
      const col = document.createElement('div')
      col.classList.add('column')
      col.innerHTML = this._getItemsTemplate(item)

      // Attach click event if handler exists
      if (this.clickHandler) {
        col.querySelector('.card')?.addEventListener('click', () => {
          const { image, title, description } = item
          this.clickHandler({ image, title, description })
        })
      }

      this.itemsContainer.appendChild(col)
    })

    // Render associated textual content
    this.contentContainer.innerHTML = this._getContentTemplate(cards.content)

    return this
  }

  /**
   * Set a custom card template function.
   * @param {(card: object) => string} fn - Function returning HTML for a given card.
   * @returns {Cards} Returns the instance for chaining.
   */
  useItemsTemplate(fn) {
    if (typeof fn === 'function') {
      this.itemsTemplateFn = fn
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
   * Register a callback to be triggered when any card is clicked.
   * @param {(link: string|object) => void} callback - Function called with the card's `link` or full card object.
   * @returns {Cards} Returns the instance for chaining.
   */
  onClick(callback) {
    if (typeof callback === 'function') {
      this.clickHandler = callback
    }
    return this
  }

  /**
   * Internal: Generate the template for a single card.
   * @param {object} card - Card data object.
   * @returns {string} HTML string for the card.
   * @private
   */
  _getItemsTemplate(card) {
    let template = `
      <article class="card">
        <img src="${card.image}" alt="${card.alt}" />
        <div class="content">
          <h2>${card.title}</h2>
          <p>${card.description}</p>
        </div>
      </article>
    `

    if (this.itemsTemplateFn) {
      template = this.itemsTemplateFn(card)
    }

    return template
  }

  /**
   * Internal: Generate HTML for the cards content section.
   * @param {object} content - Card content data object.
   * @returns {string} HTML string for the content section.
   * @private
   */
  _getContentTemplate(content) {
    let template = `
      <h1 class="center">${content.title}</h1>
    `

    if (this.contentTemplateFn) {
      template = this.contentTemplateFn(content)
    }

    return template
  }
}
