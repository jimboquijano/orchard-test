/**
 * @file tests/integration.test.js
 */

import { Cards, Gallery, staggerOnView, fadeOnView } from '../src/main.js'

describe('Integration: full page', () => {
  beforeEach(() => {
    document.body.innerHTML = `
	  <section class="wrapper gallery-section" aria-label="Cooking and gallery">
	    <div class="gallery">
		  <div class="images"></div>
		  <div class="content"></div>
		</div>
	  </section>
	  <section class="wrapper cards-section" aria-label="Taste the Colours">
	    <div class="content"></div>
		<div class="three-col items"></div>
	  </section>
	`
  })

  test('fetches and renders cards then applies staggerOnView()', async () => {
    const cards = new Cards('.cards-section')
    const data = await cards.fetch('http://localhost:3000/api/cards')

    cards.render(data)
    const cardEls = document.querySelectorAll('.cards-section .card')

    staggerOnView(cardEls, 0.3)
    expect(cardEls.length).toBeGreaterThan(0)
  })

  test('fetches and renders gallery then applies fadeOnView()', async () => {
    const gallery = new Gallery('.gallery-section')
    const data = await gallery.fetch('http://localhost:3000/api/gallery')

    gallery.render(data)
    const imgs = document.querySelectorAll('.gallery-section img')
    const content = document.querySelectorAll('.gallery-section .content')

    staggerOnView(imgs, 0.25)
    fadeOnView(content, 0.25)
    expect(imgs.length).toBeGreaterThan(0)
  })
})
