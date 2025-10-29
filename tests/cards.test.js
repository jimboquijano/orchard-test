/**
 * @file tests/cards.test.js
 */

import Cards from '../src/cards.js'

describe('Cards', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="cards-section">
        <div class="content"></div>
        <div class="items"></div>
      </section>
    `
  })

  test('fetch() retrieves mock data', async () => {
    const cards = new Cards('.cards-section')
    const data = await cards.fetch('http://localhost:3000/api/cards')

    expect(data.items.length).toBe(2)
  })

  test('render() populates items and content', async () => {
    const cards = new Cards('.cards-section')
    const data = await cards.fetch('http://localhost:3000/api/cards')
    cards.render(data)

    expect(document.querySelectorAll('.card').length).toBe(2)
    expect(document.querySelector('.content h1').textContent).toBe('Taste the Colours')
  })

  test('onClick() triggers callback with card data', async () => {
    const cards = new Cards('.cards-section')
    const data = await cards.fetch('http://localhost:3000/api/cards')
    const mockFn = vi.fn()

    cards.onClick(mockFn)
    cards.render(data)
    document.querySelector('.card').click()

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn.mock.calls[0][0]).toHaveProperty('title', 'Alpha')
  })
})
