/**
 * @file tests/gallery.test.js
 */

import Gallery from '../src/gallery.js'

describe('Gallery', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="gallery-section">
        <div class="images"></div>
        <div class="content"></div>
      </section>
    `
  })

  test('fetch() retrieves gallery mock data', async () => {
    const gallery = new Gallery('.gallery-section')
    const data = await gallery.fetch('../public/mock/gallery.json')

    expect(data.images.length).toBe(2)
  })

  test('render() populates images and content', async () => {
    const gallery = new Gallery('.gallery-section')
    const data = await gallery.fetch('../public/mock/gallery.json')
    gallery.render(data)

    expect(document.querySelectorAll('.images a').length).toBe(2)
    expect(document.querySelector('.content h1').textContent).toContain('Cooking')
  })
})
