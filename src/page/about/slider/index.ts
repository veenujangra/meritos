import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export default class Slider {
  element: HTMLElement | null
  mask: HTMLElement | null
  slides: NodeListOf<HTMLElement> | null
  tl: gsap.core.Timeline | null
  constructor(option = { element: null as HTMLElement | null }) {
    this.element = option.element
    console.log(this.element)
    this.mask = this.element?.querySelector('.about_perk-slider') || null
    this.slides = this.element?.querySelectorAll('.about_perk-card') || null
    this.tl = null
    this.create()

    this.addObserverOnMask()
  }

  create() {
    gsap.registerPlugin(ScrollTrigger)
    console.log(this.element)
    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.element,
        start: 'top 10%',
        end: 'bottom center',
        scrub: 1,
        // markers: true,
        pin: true,
      },
    })
    this.animation()
  }

  animation() {
    if (!this.slides) return
    this.tl?.to(this.slides, {
      xPercent: -100 * (this.slides.length - 1),
      ease: 'none',
      duration: 1,
    })
  }

  addObserverOnMask() {
    if (!this.mask) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // this.slides?.forEach((slide) => {
            //   slide.classList.remove('in-view')
            // })
            entry.target.classList.add('in-view')
            gsap.to(entry.target, { y: '-20%', duration: 0.5 })
            console.log(`slider ${index} in view`, entry.target)
          } else {
            entry.target.classList.remove('in-view')
            gsap.to(entry.target, { y: '0%', duration: 0.5 })
            console.log(`slider ${index} out of view`, entry.target)
          }
        })
      },
      {
        root: this.mask,
        threshold: 0.5,
      }
    )
    this.slides?.forEach((slide) => {
      observer.observe(slide)
    })
  }
}
