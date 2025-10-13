import gsap from 'gsap'
import Animation from '..'

export default class image extends Animation {
  tl: gsap.core.Timeline | undefined
  settings: { delay: string; duration: string; ease: string }
  constructor(options: { element: HTMLElement }) {
    super(options)
    this.element = options.element
    this.settings = {
      delay: this.element.getAttribute('data-delay') || '0',
      duration: this.element.getAttribute('data-duration') || '0.63',
      ease: this.element.getAttribute('data-ease') || 'power1.in',
    }
    this.create()
  }

  create() {
    // Initialize any properties or elements specific to the image animation
    this.setProperties()
  }

  setProperties() {
    // Set initial properties for the image animation
    gsap.set(this.element, {
      filter: 'blur(3px)',
      // autoAlpha: 0,
    })
  }

  animateIn() {
    if (this.tl) {
      this.tl.kill()
    }

    // Animation logic for when the image comes into view
    this.tl = gsap.timeline({})

    this.tl.fromTo(
      this.element,
      {
        // autoAlpha: 0,
        filter: 'blur(3px)',
      },
      {
        duration: this.settings.duration,
        // autoAlpha: 1,
        filter: 'blur(0px)',
        ease: this.settings.ease,
        delay: parseFloat(this.settings.delay),
        onComplete: () => {
          this.element.classList.add('is-animated')
        },
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
