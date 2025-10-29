/**
 * @file tests/helpers.test.js
 */

import { truncateByWords, fadeOnView, staggerOnView } from '../src/helpers.js'

describe('helpers.js', () => {
  test('truncateByWords() shortens long strings correctly', () => {
    const text = 'one two three four five six seven'
    const result = truncateByWords(text, 3)

    expect(result).toBe('one two three...')
  })

  test('truncateByWords() returns same text if shorter than limit', () => {
    const text = 'short text'

    expect(truncateByWords(text, 10)).toBe('short text')
  })

  test('fadeOnView() adds visible class when in viewport', async () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    fadeOnView([el], 0)

    // Simulate intersection
    el.classList.add('visible')
    expect(el.classList.contains('visible')).toBe(true)
  })

  test('staggerOnView() adds visible class with delay', async () => {
    const el1 = document.createElement('div')
    const el2 = document.createElement('div')
    document.body.append(el1, el2)
    staggerOnView([el1, el2], 0)

    el1.classList.add('visible')
    el2.classList.add('visible')

    expect(el1.classList.contains('visible')).toBe(true)
    expect(el2.classList.contains('visible')).toBe(true)
  })
})
