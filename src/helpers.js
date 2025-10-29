/**
 * @file src/helpers.js
 * @description Utility functions for common DOM, data, and formatting operations used across modules.
 */

/**
 * Truncate a string by a given number of words.
 *
 * @param {string} content - The full text content to truncate.
 * @param {number} wordLimit - Number of words to keep before truncating.
 * @returns {string} - The truncated text with an ellipsis if trimmed.
 *
 * Example:
 * const text = "This is a long paragraph that should be shortened for display purposes."
 * const shortText = truncateByWords(text, 5)
 * console.log(shortText) // "This is a long paragraph..."
 */
export function truncateByWords(content, wordLimit = 75) {
  if (typeof content !== 'string') return ''

  const words = content.trim().split(/\s+/)
  if (words.length <= wordLimit) return content.trim()

  return words.slice(0, wordLimit).join(' ') + '...'
}

/**
 * Observe elements and trigger a CSS animation when they enter the viewport.
 * Internal utility used by both `fadeOnView` and `staggerOnView`.
 *
 * @param {NodeListOf<Element> | Element[]} els - Elements to observe.
 * @param {number} [threshold=0.2] - IntersectionObserver visibility threshold.
 * @param {Function} [onEnter] - Callback for when an element becomes visible.
 * @param {string} [hiddenClass] - Initial hidden state class.
 */
function observeOnView(els, threshold = 0.2, onEnter, hiddenClass) {
  if (!els || !els.length) return

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target
          if (typeof onEnter === 'function') onEnter(el, index)
          obs.unobserve(el)
        }
      })
    },
    { threshold }
  )

  els.forEach((el) => {
    if (hiddenClass) el.classList.add(hiddenClass)
    observer.observe(el)

    requestAnimationFrame(() => {
      void el.offsetWidth
    })
  })
}

/**
 * Apply a fade-in animation to elements as they enter the viewport.
 *
 * @param {NodeListOf<Element> | Element[]} els - The elements to fade in.
 * @param {number} [threshold=0.2] - The IntersectionObserver visibility threshold.
 * @returns {void}
 *
 * Example:
 * fadeOnView(document.querySelectorAll('.section'), 0.25)
 */
export function fadeOnView(els, threshold = 0.2) {
  observeOnView(
    els,
    threshold,
    (el) => {
      setTimeout(() => el.classList.add('visible'), 250)
    },
    'fade-hidden'
  )
}

/**
 * Apply a staggered animation to a set of elements as they enter the viewport.
 *
 * @param {NodeListOf<Element> | Element[]} els - The elements to animate.
 * @param {number} [threshold=0.2] - The IntersectionObserver visibility threshold.
 * @returns {void}
 *
 * Example:
 * staggerOnView(document.querySelectorAll('.card'), 0.3)
 */
export function staggerOnView(els, threshold = 0.2) {
  observeOnView(
    els,
    threshold,
    (el, index) => {
      setTimeout(() => {
        el.style.transitionDelay = `${index * 100}ms`
        el.classList.add('visible')
      }, 50)
    },
    'stagger-hidden'
  )
}
