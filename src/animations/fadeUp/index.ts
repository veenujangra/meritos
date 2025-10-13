import Animation from '..'
import gsap from 'gsap'

export default class FadeUp extends Animation {
  settings: { delay: string; duration: string; ease: string }
  tl: any

  constructor(options: { element: HTMLElement }) {
    super(options)
    this.element = options.element
    this.settings = {
      delay: this.element.getAttribute('data-delay') || '0',
      duration: this.element.getAttribute('data-duration') || '0.63',
      ease: this.element.getAttribute('data-ease') || 'power2.out',
    }

    this.create()
  }

  create() {
    // Initialize any properties or elements specific to the fade-up animation
    this.setProperties()
  }

  setProperties() {
    // Set initial properties for the fade-up animation
    gsap.set(this.element, {
      opacity: 0,
      y: 20,
    })
  }

  animateIn() {
    if (this.tl) {
      this.tl.kill()
    }

    this.tl = gsap.timeline({})

    // Animation logic for when the element comes into view
    this.tl.fromTo(
      this.element,
      {
        opacity: 0,
        y: 20,
      },
      {
        duration: this.settings.duration,
        opacity: 1,
        y: 0,
        ease: this.settings.ease,
        delay: parseFloat(this.settings.delay),
      }
    )
  }

  animateOut() {
    if (!this.element || !this.element.hasAttribute('data-allow-repeat')) return

    if (this.tl) {
      this.tl.revert()
    }
  }
}
