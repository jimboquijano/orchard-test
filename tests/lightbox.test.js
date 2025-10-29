/**
 * @file tests/lightbox.test.js
 */

import { Lightbox } from '../src/lightbox.js'

describe('Lightbox', () => {
  let imgs

  beforeEach(() => {
    document.body.innerHTML = ''
    imgs = [document.createElement('a'), document.createElement('a')]
    imgs[0].href = '1L.jpg'
    imgs[1].href = '2L.jpg'

    const imgEl1 = document.createElement('img')
    const imgEl2 = document.createElement('img')

    imgs[0].appendChild(imgEl1)
    imgs[1].appendChild(imgEl2)
  })

  test('creates lightbox DOM structure', () => {
    const lb = new Lightbox()
    lb.init(imgs)

    expect(document.querySelector('.lightbox')).toBeTruthy()
  })

  test('open() sets image src and aria-hidden', () => {
    const lb = new Lightbox()
    lb.init(imgs)
    lb.open()
    const lbImg = document.querySelector('.lightbox-img')

    expect(lbImg.src).toContain('1L.jpg')
    expect(document.querySelector('.lightbox').getAttribute('aria-hidden')).toBe('false')
  })

  test('next() cycles images', () => {
    const lb = new Lightbox()
    lb.init(imgs)
    lb.next()

    expect(lb.currentIndex).toBe(1)
  })

  test('prev() cycles back', () => {
    const lb = new Lightbox()
    lb.init(imgs)
    lb.prev()

    expect(lb.currentIndex).toBe(imgs.length - 1)
  })

  test('close() hides the lightbox', () => {
    const lb = new Lightbox()
    lb.init(imgs)
    lb.open()
    lb.close()

    expect(document.querySelector('.lightbox').getAttribute('aria-hidden')).toBe('true')
  })
})
