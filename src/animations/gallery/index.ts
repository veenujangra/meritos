import type Lenis from 'lenis'
import gsap from 'gsap'

export default class Gallery {
  list: HTMLElement[]
  settings: { rotationAngle: number; direction: number; defaultSpeed: number }
  lenis: Lenis
  observer: IntersectionObserver | null = null

  constructor(options: { list: HTMLElement[]; lenis: Lenis }) {
    this.list = options.list
    this.lenis = options.lenis

    this.settings = {
      rotationAngle: 0,
      defaultSpeed: 0.1,
      direction: 1,
    }

    this.create()
    this.initObserver()
    this.update()
  }

  create() {
    this.list.forEach((item) => {
      const images = item.querySelectorAll('[data-gallery = media]')
      images.forEach((image, index) => {
        const angle = (index / images.length) * Math.PI * 2
        const radius = parseInt(item.getAttribute('data-gallery-radius') || '0')
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        if (item.hasAttribute('look-at-center')) {
          const angleToCenter = (index / images.length) * Math.PI * 2 + Math.PI / 2
          const img = image.querySelector('img')

          if (img) {
            img.setAttribute('style', `transform: rotateZ(${angleToCenter}rad);`)
          }
          image.setAttribute('style', `transform: translate3d(${x}rem, ${y}rem, 0px);`)
        } else {
          image.setAttribute('style', `transform: translate3d(${x}rem, ${y}rem, 0px) rotateZ(${angle}rad);`)
        }
      })
    })
  }

  initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const image = entry.target.querySelector('img') as Element
          if (entry.isIntersecting) {
            this.animateIn(image)
          } else {
            this.animateOut(image)
          }
        })
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.5, // Trigger when 50% of the element is visible
        // add exit threshold if needed
        // rootMargin: '10% 0px -10% 0px', // Adjust the margin to trigger exit animation earlier
      }
    )

    this.list.forEach((item, index) => {
      if (index === 0) {
        // Skip the first item for initial animation
        return
      }
      const images = item.querySelectorAll('[data-gallery = media]')
      images.forEach((image) => {
        this.observer?.observe(image)
      })
    })
  }

  animateIn(image: Element) {
    gsap.to(image, {
      duration: 0.5,
      scale: 1,
      onStart: () => {
        image.classList.add('animate-in')
      },
      onComplete: () => {
        image.classList.remove('animate-in')
      },
    })
  }

  animateOut(image: Element) {
    if (image.classList.contains('animate-out')) return

    gsap.to(image, {
      duration: 0.5,
      scale: 0,
      onStart: () => {
        image.classList.add('animate-out')
      },
      onComplete: () => {
        image.classList.remove('animate-out')
      },
    })
  }

  updateRotation() {
    if (this.lenis.velocity > 0) {
      this.settings.direction = -1
    } else {
      this.settings.direction = 1
    }
    this.settings.rotationAngle += this.settings.defaultSpeed + this.lenis.velocity * 0.1

    this.list.forEach((item) => {
      if (!item.hasAttribute('rotation-off')) {
        item.style.transform = `rotateZ(${this.settings.rotationAngle}deg)`
      }
    })
  }

  update() {
    this.updateRotation()
    requestAnimationFrame(this.update.bind(this))
  }
}
